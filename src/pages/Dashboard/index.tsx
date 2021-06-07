import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower, FiChevronRight } from 'react-icons/fi';
import { isToday, format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
  HeaderOptions,
  NoAvatarContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import 'react-day-picker/lib/style.css';

import logoImg from '../../assets/logo.jpg';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

// Falta listar os appointments do dia.

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  patient: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
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
        .get<Appointment[]>('/appointments/doctor', {
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
        .get<Appointment[]>('/appointments/user', {
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
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/">
            <img src={logoImg} alt="OnHealth" />
          </Link>

          <Profile>
            {user.avatar_url && (
              <img src={user.avatar_url} alt={user.avatar_url} />
            )}
            {!user.avatar_url && (
              <NoAvatarContainer>
                <span>{`${user.first_name
                  .charAt(0)
                  .toUpperCase()}${user.last_name
                  .charAt(0)
                  .toUpperCase()}`}</span>
              </NoAvatarContainer>
            )}
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{`${user.first_name} ${user.last_name}`}</strong>
              </Link>
            </div>
          </Profile>

          <HeaderOptions>
            {user.type === 'user' && (
              <Link to="/create-appointment">Nova consulta</Link>
            )}
            <Link to="/history">Meu Hisórico</Link>
          </HeaderOptions>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

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
              <div>
                <img
                  src={nextAppointment.patient.avatar_url}
                  alt={nextAppointment.patient.first_name}
                />
                <strong>{`${nextAppointment.patient.first_name
                  .charAt(0)
                  .toUpperCase()}${nextAppointment.patient.first_name
                  .charAt(0)
                  .toUpperCase()}`}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
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
                <div>
                  <img
                    src={appointment.patient.avatar_url}
                    alt={`${appointment.patient.first_name
                      .charAt(0)
                      .toUpperCase()}${appointment.patient.last_name
                      .charAt(0)
                      .toUpperCase()}`}
                  />

                  <strong>
                    {`${appointment.patient.first_name} ${appointment.patient.last_name}`}
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
  );
};

export default Dashboard;
