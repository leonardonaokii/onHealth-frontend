import { FiCalendar, FiChevronRight, FiClock, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import { Container, Content, Appointment, TimeContainer } from './styles';

import logoImg from '../../assets/logo.jpg';
import api from '../../services/api';

import Header from '../../components/Header';

interface Appointment {
  id: string;
  date: string;
  status: 0 | 1;
  patient: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  doctor: {
    medical_specialty: string;
    avatar_url: string;
  };
}

const History: React.FC = () => {
  const { signOut, user } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user.type === 'doctor') {
      api.get<Appointment[]>('appointments/doctor').then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          const dateArray = appointment.date.split('-');

          const day = dateArray[2].slice(0, 2);

          const year = dateArray[0].slice(2, 4);

          const parsedDate = `${day}/${dateArray[1]}/${year}`;

          return {
            ...appointment,
            date: parsedDate,
          };
        });
        setAppointments(appointmentsFormatted);
      });
    } else {
      api.get<Appointment[]>('appointments/user').then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          const dateArray = appointment.date.split('-');

          const day = dateArray[2].slice(0, 2);

          const year = dateArray[0].slice(2, 4);

          const parsedDate = `${day}/${dateArray[1]}/${year}`;

          return {
            ...appointment,
            date: parsedDate,
          };
        });
        setAppointments(appointmentsFormatted);
      });
    }
  }, [user.type]);

  return (
    <Container>
      <Header />
      <Content>
        <h1>Histórico de consultas</h1>

        {appointments.length === 0 && <p>Você não possui agendamentos</p>}

        {appointments.map(appointment => (
          <Appointment id={appointment.id}>
            <Link to="/">
              <img
                src={appointment.patient.avatar_url}
                alt={`${appointment.patient.first_name
                  .charAt(0)
                  .toUpperCase()}${appointment.patient.first_name
                  .charAt(0)
                  .toUpperCase()}`}
              />
              <strong>
                {`${appointment.patient.first_name} ${appointment.patient.last_name}`}
              </strong>

              <TimeContainer>
                <FiCalendar />
                <span>{appointment.date}</span>
              </TimeContainer>
            </Link>
          </Appointment>
        ))}
      </Content>
    </Container>
  );
};

export default History;
