// import '../../components/Firebase/firebase';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useParams } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import { useCallback, useRef, useState, useEffect, FormEvent } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Avatar } from '@material-ui/core';
import ChatMessage from '../../components/ChatMessage';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import {
  Container,
  Content,
  TextAreaContainer,
  AppointmentDataContainer,
  DateContainer,
  SymptomContainer,
  ChatModalButton,
  ScrollWrapper,
  SendMessageForm,
} from './styles';
import 'react-datepicker/dist/react-datepicker.css';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import ChatModal from '../../components/ChatModal';

interface AppointmentFormData {
  description: string;
  result: string;
}

interface Symptom {
  name: string;
}

interface AppointmentSymptom {
  symptom: Symptom;
}

interface Appointment {
  date: string;
  description: string;
  result: string;
  status: number;
  formattedDate: string;
  doctor: {
    medspec: {
      name: string;
    };
    user: {
      first_name: string;
      last_name: string;
      avatar_url: string;
    };
  };
  patient: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
  appointment_symptoms: AppointmentSymptom[];
}

interface AppointmentRouteParams {
  appointment_id: string;
}

interface Message {
  text: string;
  uid: string;
}

const firestore = firebase.firestore();

const Profile: React.FC = () => {
  const { appointment_id } = useParams<AppointmentRouteParams>();

  const messagesRef = firestore.collection(`appointment-${appointment_id}`);
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData<Message>(query, { idField: 'id' });

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();
  const [appointment, setAppointment] = useState<Appointment>(
    {} as Appointment,
  );
  const [showModal, setShowModal] = useState(false);
  const [formValue, setFormValue] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (showModal) {
      scrollToBottom();
    }
  }, [showModal]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.id,
    });

    setFormValue('');
  };

  useEffect(() => {
    api.get(`/appointments/${appointment_id}`).then(response => {
      const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'short',
      }).format(new Date(response.data.date));

      const appointmentData = {
        ...response.data,
        formattedDate,
      };

      setAppointment(appointmentData);
    });
  }, [appointment_id, setAppointment]);

  const handleSubmit = useCallback(
    async (data: AppointmentFormData) => {
      try {
        const schema = Yup.object().shape({
          description: Yup.string().required(),
          result: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/appointments/${appointment_id}`, data);

        addToast({
          type: 'success',
          title: 'Consulta finalizada!',
          description: 'Seus dados foram atualizados!',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro na finalização',
            description: 'Verifique os dados, tente novamente.',
          });
        }
      }
    },
    [addToast, appointment_id, history],
  );

  return (
    <Container>
      <Content>
        <header>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </header>

        <Form ref={formRef} initialData={appointment} onSubmit={handleSubmit}>
          <h1>Consulta</h1>

          <AppointmentDataContainer>
            <Avatar
              style={{ width: '90px', height: '90px', marginRight: '10px' }}
              src={
                user.type === 'doctor'
                  ? appointment?.patient?.avatar_url
                  : appointment?.doctor?.user?.avatar_url
              }
              alt="None"
            />
            <div>
              <p>
                {`Nome: ${
                  user.type === 'doctor'
                    ? `${appointment?.patient?.first_name} ${appointment?.patient?.last_name}`
                    : `${appointment?.doctor?.user?.first_name} ${appointment?.doctor?.user?.last_name}`
                }`}
              </p>
              {user.type === 'user' && (
                <p>{`Especialidade: ${appointment?.doctor?.medspec?.name}`}</p>
              )}
            </div>
          </AppointmentDataContainer>

          <DateContainer>
            <p>{`Data da consulta: ${appointment?.formattedDate}hrs`}</p>
          </DateContainer>

          {appointment?.status === 0 && (
            <ChatModalButton
              type="button"
              onClick={() => setShowModal(!showModal)}
            >{`Ir para o chat com o ${
              user.type === 'doctor' ? 'paciente' : 'médico'
            }`}</ChatModalButton>
          )}

          {appointment?.status === 1 && (
            <p className="status-info">Status: Consulta Finalizada</p>
          )}

          <div className="info">
            <p>Informações</p>
          </div>

          <SymptomContainer>
            <p>{`Sintomas relatados: `}</p>
            {appointment?.appointment_symptoms?.map(symp => (
              <div>
                <span>{symp.symptom.name}</span>
              </div>
            ))}
          </SymptomContainer>

          <TextAreaContainer>
            <p>Descrição</p>
            <TextArea name="description" readOnly />
          </TextAreaContainer>

          <TextAreaContainer>
            <p>Resultado</p>
            <TextArea name="result" readOnly={user.type === 'user'} />
          </TextAreaContainer>

          {user.type === 'doctor' && (
            <Button
              className="finish-appointment"
              type="submit"
              onClick={() => handleSubmit}
            >
              Finalizar Consulta
            </Button>
          )}
        </Form>
      </Content>
      <ChatModal
        name={
          user.type === 'doctor'
            ? appointment?.patient?.first_name
            : appointment?.doctor?.user.first_name
        }
        setShowModal={setShowModal}
        showModal={showModal}
        image={
          user.type === 'doctor'
            ? appointment?.patient?.avatar_url
            : appointment?.doctor?.user?.avatar_url
        }
      >
        <div>
          <ScrollWrapper>
            {messages &&
              messages.map(msg => (
                <ChatMessage key={msg.uid} message={msg} user_id={user.id} />
              ))}
            <div ref={messagesEndRef} />
          </ScrollWrapper>
          <SendMessageForm action="submit" onSubmit={sendMessage}>
            <input
              value={formValue}
              onChange={e => setFormValue(e.target.value)}
            />
            <button disabled={!formValue} type="submit">
              Enviar
            </button>
          </SendMessageForm>
        </div>
      </ChatModal>
    </Container>
  );
};

export default Profile;
