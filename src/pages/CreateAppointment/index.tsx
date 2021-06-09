import { DropdownItemProps } from 'react-bootstrap/esm/DropdownItem';
import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Header from '../../components/Header';
import { Container, Content, DoctorProfile } from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';

interface MedicalSpecialty {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  medical_specialty: {
    id: number;
    name: string;
  };
  user: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
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
  const [expanded, setExpanded] = useState<string | false>(false);
  const [medSpecialties, setMedSpecialties] = useState<MedicalSpecialty[]>([]);
  const [selectedMedSpec, setSelectedMedSpec] = useState<string>(
    'Selecione a especialidade médica',
  );
  const [doctors, setDoctor] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

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
      console.log(response.data);
    });
  }, []);

  const handleSelectMedSpec = useCallback(e => {
    setSelectedMedSpec(e);
  }, []);

  const handleSelectDoctor = useCallback(e => {
    setSelectedDoctor(e);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <h1>Novo Agendamento</h1>
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
                {doctors.map(doctor => (
                  <DoctorProfile>
                    <img
                      src={doctor.user.avatar_url}
                      alt={`${doctor.user.first_name} ${doctor.user.last_name}`}
                    />
                    <div>
                      <strong>{`${doctor.user.first_name} ${doctor.user.last_name}`}</strong>
                      <span>{doctor.medical_specialty.name}</span>
                    </div>
                  </DoctorProfile>
                ))}
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
                Selecione o horário disponível.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
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
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Preencha os dados para a consulta</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Content>
    </Container>
  );
};

export default NewAppointment;
