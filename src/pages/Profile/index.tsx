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
  FiArrowLeft,
  FiCamera,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { ChangeEvent, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Content,
  Header,
  NoAvatarContainer,
  AvatarInput,
} from './styles';

import logoImg from '../../assets/logo.jpg';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

// falta formatar a data de nascimento e se der tempo implementar a atualização dos dados médicos.

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  phone: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  gender: 'male' | 'female' | undefined;
  birth_date: string;
  country: string;
  administrative_area: string;
  locality: string;
  thoroughfare: string;
  zipcode: string;
  // crm: string;
  // medical_specialty: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome obrigatório'),
          last_name: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('Cpf obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório!'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório!'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação Incorreta'),
          gender: Yup.string(),
          birth_date: Yup.string(),
          country: Yup.string(),
          administrative_area: Yup.string(),
          locality: Yup.string(),
          thoroughfare: Yup.string(),
          zipcode: Yup.string(),
          // crm: Yup.string().required(),
          // medical_specialty: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          first_name,
          last_name,
          email,
          cpf,
          phone,
          old_password,
          password,
          password_confirmation,
          gender,
          birth_date,
          country,
          administrative_area,
          locality,
          thoroughfare,
          zipcode,
          // crm,
          // medical_specialty,
        } = data;

        const userData = {
          first_name,
          last_name,
          email,
          cpf,
          phone,
          ...(data.gender
            ? {
                gender,
              }
            : {}),
          ...(data.birth_date
            ? {
                birth_date,
              }
            : {}),
          ...(data.country
            ? {
                country,
              }
            : {}),
          ...(data.administrative_area
            ? {
                administrative_area,
              }
            : {}),
          ...(data.locality
            ? {
                locality,
              }
            : {}),
          ...(data.thoroughfare
            ? {
                thoroughfare,
              }
            : {}),
          ...(data.zipcode
            ? {
                zipcode,
              }
            : {}),
          ...(data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/users', userData);

        // if (user.type === 'doctor') {
        //   const doctor = await api.get('/doctors');

        //   const doctorData = { crm, medical_specialty };

        //   await api.put('/doctors', doctorData);
        // }

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Atualização realizada!',
          description: 'Seus dados foram atualizados!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar suas informações, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar Atualizado',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Content>
        <header>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </header>
        <Header>
          <AvatarInput>
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
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
        </Header>

        <Form ref={formRef} initialData={user} onSubmit={handleSubmit}>
          <h1>Meu perfil</h1>

          <Input
            name="first_name"
            icon={FiUser}
            placeholder="Nome"
            type="text"
          />
          <Input
            name="last_name"
            icon={FiUser}
            placeholder="Sobrenome"
            type="text"
          />
          <Input name="email" icon={FiMail} placeholder="E-mail" type="text" />
          <Input name="cpf" icon={FiArchive} placeholder="CPF" type="text" />
          <Input
            name="phone"
            icon={FiPhone}
            placeholder="Telefone"
            type="text"
          />
          <Input
            name="old_password"
            icon={FiUnlock}
            placeholder="Senha"
            type="password"
          />
          <Input
            name="password"
            icon={FiUnlock}
            placeholder="Nova Senha"
            type="password"
          />
          <Input
            name="password-confirmation"
            icon={FiLock}
            placeholder="Confirmar Senha"
            type="password"
          />
          <Input name="gender" icon={FiCircle} placeholder="Sexo" type="text" />
          <Input
            name="birth_date"
            icon={FiCalendar}
            placeholder="Data de Nascimento"
            type="text"
          />
          <Input name="country" icon={FiMap} placeholder="País" type="text" />
          <Input
            name="administrative_area"
            icon={FiMap}
            placeholder="Estado"
            type="text"
          />
          <Input
            name="locality"
            icon={FiMap}
            placeholder="Cidade"
            type="text"
          />
          <Input
            name="thoroughfare"
            icon={FiMap}
            placeholder="Endereço"
            type="text"
          />
          <Input name="zipcode" icon={FiMap} placeholder="CEP" type="text" />
          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
