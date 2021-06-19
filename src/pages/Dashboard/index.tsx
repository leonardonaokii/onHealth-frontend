import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower, FiChevronRight } from 'react-icons/fi';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import {
  Container,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/auth';
import 'react-day-picker/lib/style.css';

import logoImg from '../../assets/logo.jpg';
import api from '../../services/api';

import Header from '../../components/Header';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  patient: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  doctor: {
    medical_specialty: string;
    avatar_url: string;
    user: {
      first_name: string;
      last_name: string;
      avatar_url: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    if (user.type === 'doctor') {
      api
        .get<Appointment[]>('/appointments/doctor/', {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        })
        .then(response => {
          const appointmentsFormatted = response.data.map(appointment => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          });
          setAppointments(appointmentsFormatted);
        });
    } else {
      api
        .get<Appointment[]>('/appointments/user/', {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        })
        .then(response => {
          const appointmentsFormatted = response.data.map(appointment => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          });
          setAppointments(appointmentsFormatted);
        });
    }
  }, [selectedDate, user.type]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <>
      <Container>
        <Header />
        <Content>
          <Schedule>
            <h1>Horários agendados</h1>
            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>

            {isToday(selectedDate) && nextAppointment && (
              <NextAppointment>
                <strong>Agendamento a seguir</strong>
                <div className="next-appointment-content">
                  <Avatar
                    style={{ height: '100px', width: '100px' }}
                    src={
                      user.type === 'doctor'
                        ? nextAppointment.patient.avatar_url
                        : nextAppointment.doctor.user.avatar_url
                    }
                    alt={
                      user.type === 'doctor'
                        ? `${nextAppointment.patient.first_name}`
                        : `${nextAppointment.doctor.user.first_name}`
                    }
                  />

                  <strong>
                    {user.type === 'doctor'
                      ? `${nextAppointment.patient.first_name} ${nextAppointment.patient.last_name}`
                      : `${nextAppointment.doctor.user.first_name} ${nextAppointment.doctor.user.last_name}`}
                  </strong>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                  <Link to={`/appointment/${nextAppointment.id}`}>
                    <FiChevronRight className="icons" />
                  </Link>
                </div>
              </NextAppointment>
            )}

            <Section>
              <strong>Agendamentos</strong>

              {appointments.length === 0 && <p>Nenhum agendamento neste dia</p>}

              {appointments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div className="appointment-content">
                    <Avatar
                      style={{ width: '50px', height: '50px' }}
                      src={
                        user.type === 'doctor'
                          ? appointment.patient.avatar_url
                          : appointment.doctor.user.avatar_url
                      }
                      alt={
                        user.type === 'doctor'
                          ? `${appointment.patient.first_name}`
                          : `${appointment.doctor.user.first_name}`
                      }
                    />

                    <strong>
                      {user.type === 'doctor'
                        ? `${appointment.patient.first_name} ${appointment.patient.last_name}`
                        : `${appointment.doctor.user.first_name} ${appointment.doctor.user.last_name}`}
                    </strong>

                    <Link to={`/appointment/${appointment.id}`}>
                      <FiChevronRight />
                    </Link>
                  </div>
                </Appointment>
              ))}
            </Section>
          </Schedule>

          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[...disabledDays]}
              modifiers={{
                available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
              }}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
