import {
  FiMail,
  FiLock,
  FiUser,
  FiUnlock,
  FiCalendar,
  FiCircle,
  FiPhone,
  FiMap,
  FiActivity,
  FiArchive,
  FiLogIn,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, TwoColumnContainer } from './styles';

import logoImg from '../../assets/logo.jpg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  type: boolean;
  // crm: string;
  // medical_specialty: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome obrigatório'),
          last_name: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('Cpf obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string()
            .required('Confirmação obrigatória')
            .oneOf([Yup.ref('password'), null], 'Confirmação Incorreta'),
          // type: Yup.boolean(),
          // crm: Yup.string().when('type', {
          //   is: true,
          //   then: Yup.string().required('Crm obrigatório!'),
          //   otherwise: Yup.string(),
          // }),
          // medical_specialty: Yup.string().when('type', {
          //   is: true,
          //   then: Yup.string().required(
          //     'A especialidade médica precisa ser informada.',
          //   ),
          //   otherwise: Yup.string(),
          // }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data.first_name);

        const {
          first_name,
          last_name,
          email,
          cpf,
          phone,
          password,
          type,
          // crm,
          // medical_specialty,
        } = data;

        const userType = type ? 'doctor' : 'user';

        const userData = {
          first_name,
          last_name,
          email,
          cpf,
          phone,
          password,
          type: userType,
        };

        console.log(userData);

        const user = await api.post('/users', userData);

        // if (userType === 'doctor') {
        //   const { id } = user.data;

        //   const doctorData = { id, type, crm, medical_specialty };

        //   await api.post('/doctors', doctorData);
        // }

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
          description: 'Você já pode fazer seu logon no onHealth!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="onHealth" />
        <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
        <TwoColumnContainer>
          <Input name="email" icon={FiMail} placeholder="E-mail" type="text" />
          <Input
            name="register-id"
            icon={FiArchive}
            placeholder="CPF"
            type="text"
          />
        </TwoColumnContainer>
        <TwoColumnContainer>
          <Input
            name="birth-date"
            icon={FiCalendar}
            placeholder="Data de Nascimento"
            type="text"
          />
          <Input name="gender" icon={FiCircle} placeholder="Sexo" type="text" />
        </TwoColumnContainer>
        <Input name="phone" icon={FiPhone} placeholder="Telefone" type="text" />
        <Input name="address" icon={FiMap} placeholder="Endereço" type="text" />
        <Input
          name="doctor-register-id"
          icon={FiActivity}
          placeholder="CRM"
          type="text"
        />
        <Input
          name="password"
          icon={FiUnlock}
          placeholder="Senha"
          type="password"
        />
        <Input
          name="password-confirmation"
          icon={FiLock}
          placeholder="Confirmar Senha"
          type="password"
        />
        <Button>Cadastrar</Button>
        <Link to="/signin">
          <FiLogIn />
          Fazer Login
        </Link>
      </Content>
    </Container>
  );
};

export default Profile;
