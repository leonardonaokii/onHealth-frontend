import DatePicker from 'react-datepicker';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { format } from 'date-fns';
import { ChangeEvent, useState, useEffect, useCallback, useMemo } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

import {
  Container,
  Content,
  DoctorProfile,
  DoctorProfileContainer,
  DateContainer,
  HourWrapper,
  Hour,
} from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface MedicalSpecialty {
  id: number;
  name: string;
}

interface Doctor {
  id: string;
  medspec: {
    id: number;
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

const NewAppointment: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { addToast } = useToast();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [medSpecialties, setMedSpecialties] = useState<MedicalSpecialty[]>([]);
  const [selectedMedSpec, setSelectedMedSpec] = useState<string>(
    'Selecione a especialidade médica',
  );
  const [doctors, setDoctor] = useState<Doctor[]>([]);

  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const [selectedHour, setSelectedHour] = useState(0);

  const [description, setDescription] = useState('');

  const handleChange = (panel: string) => (
    event: ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    api.get<MedicalSpecialty[]>('/medical-specialty').then(response => {
      setMedSpecialties(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Doctor[]>('/doctors/all').then(response => {
      setDoctor(response.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedDoctor) {
      return;
    }
    api
      .get(`/appointments/doctor/${selectedDoctor}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        console.log(response.data);
      });
  }, [selectedDate, selectedDoctor]);

  const hoursFormatted = useMemo(() => {
    return availability.map(({ hour, available }) => {
      return {
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      };
    });
  }, [availability]);

  const handleSelectMedSpec = useCallback(e => {
    setSelectedMedSpec(e);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    const date = selectedDate.setHours(selectedHour);

    const newAppointment = {
      doctor_id: selectedDoctor,
      date,
      symptoms: 0,
      description,
    };

    try {
      await api.post('/appointments', newAppointment);
      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro Realizado!',
        description: 'Você já pode fazer seu logon no onHealth!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro a criar consulta!',
        description:
          'Erro a criar consulta, verifique os dados e tente novamente!',
      });
    }
  }, [
    addToast,
    description,
    history,
    selectedDate,
    selectedDoctor,
    selectedHour,
  ]);

  return (
    <Container>
      <Header />
      <Content>
        <h1>Novo Consulta</h1>
        <div className={classes.root}>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>Passo 1.</Typography>
              <Typography className={classes.secondaryHeading}>
                Selecione a expecialidade médica que deseja realizar a consulta.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={selectedMedSpec}
                  onSelect={handleSelectMedSpec}
                >
                  {medSpecialties.map(medSpec => (
                    <Dropdown.Item
                      eventKey={`${medSpec.id}. ${medSpec.name}`}
                      id={medSpec.id}
                    >
                      {`${medSpec.id}. ${medSpec.name}`}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Passo 2.</Typography>
              <Typography className={classes.secondaryHeading}>
                Selecione o médico.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <DoctorProfileContainer>
                  {doctors.map(doctor => (
                    <DoctorProfile
                      onClick={() => setSelectedDoctor(doctor.id)}
                      key={doctor.id}
                      selected={selectedDoctor === doctor.id}
                    >
                      <img
                        src={doctor.user.avatar_url}
                        alt={`${doctor.user.first_name} ${doctor.user.last_name}`}
                      />
                      <div>
                        <strong>{`${doctor.user.first_name} ${doctor.user.last_name}`}</strong>
                      </div>
                    </DoctorProfile>
                  ))}
                </DoctorProfileContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>Passo 3.</Typography>
              <Typography className={classes.secondaryHeading}>
                Selecione a data e horário desejado.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <DateContainer>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={selectedDate}
                    onChange={date =>
                      date instanceof Date ? setSelectedDate(date) : null
                    }
                  />
                  <HourWrapper className="hourAvailability">
                    {hoursFormatted.map(
                      availableHour =>
                        availableHour.available && (
                          <Hour
                            key={availableHour.hour}
                            type="button"
                            onClick={() => setSelectedHour(availableHour.hour)}
                            selected={selectedHour === availableHour.hour}
                          >
                            {availableHour.hourFormatted}
                          </Hour>
                        ),
                    )}
                  </HourWrapper>
                </DateContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>Passo 4</Typography>
              <Typography className={classes.secondaryHeading}>
                Preencha o campo abaixo com os sintomas, alergias e remédios que
                utiliza.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  style={{ width: '800px' }}
                  onChange={e => setDescription(e.target.value)}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <button
          className="buttonSubmit"
          type="button"
          onClick={handleCreateAppointment}
        >
          Agendar Consulta
        </button>
      </Content>
    </Container>
  );
};

export default NewAppointment;
