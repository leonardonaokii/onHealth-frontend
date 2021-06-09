import { FiChevronLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ChangeEvent, useState } from 'react';
import Header from '../../components/Header';
import { Container, Content, StepsContainer, DoctorProfile } from './styles';

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

  const handleChange = (panel: string) => (
    event: ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { goBack } = useHistory();

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
                Selecione a expecialidade médica.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
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
                <DoctorProfile>
                  <img
                    src="https://cdn1.edgedatg.com/aws/v2/abc/TheGoodDoctor/person/2057217/940a0a319f940a38d6740423183e5df1/579x579-Q90_940a0a319f940a38d6740423183e5df1.jpg"
                    alt="GD"
                  />
                  <div>
                    <strong>Shawn Murphy</strong>
                    <span>Geriatra</span>
                  </div>
                </DoctorProfile>
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
