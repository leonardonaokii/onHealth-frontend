import {
  FiMail,
  FiLock,
  FiUser,
  FiUnlock,
  FiPhone,
  FiArchive,
  FiLogIn,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import { Container, Content } from './styles';

import logoImg from '../../assets/logo.jpg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  password_confirmation: string;
  type: boolean;
  crm: string;
  medical_specialty: number;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome obrigatório'),
          last_name: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('Cpf obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          password: Yup.string()
            .required('Senha obrigatória.')
            .min(6, 'No mínimo 6 dígitos.'),
          password_confirmation: Yup.string()
            .required('Confirmação obrigatória')
            .oneOf([Yup.ref('password'), null], 'Confirmação Incorreta'),
          type: Yup.boolean(),
          crm: Yup.string().when('type', {
            is: true,
            then: Yup.string().required('Crm obrigatório!'),
            otherwise: Yup.string(),
          }),
          medical_specialty: Yup.string().when('type', {
            is: true,
            then: Yup.string().required(
              'A especialidade médica precisa ser informada.',
            ),
            otherwise: Yup.string(),
          }),
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
          password,
          type,
          crm,
          medical_specialty,
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

        const validateCrmAvailability = await api.get(
          `/doctors/crm-availability/${crm}`,
        );

        if (!validateCrmAvailability) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro!',
            description: 'Crm já cadastrado!',
          });
        }

        const user = await api.post('/users', userData);

        console.log(user);

        if (userType === 'doctor') {
          const { id } = user.data;

          const doctorData = { id, type: userType, crm, medical_specialty };

          const doctor = await api.post('/doctors', doctorData);

          console.log(doctor);
        }

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado!',
          description: 'Você já pode fazer seu logon no onHealth!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);

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

  const handleCheckBox = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="onHealth" />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
            name="password"
            icon={FiUnlock}
            placeholder="Senha"
            type="password"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar Senha"
            type="password"
          />
          <CheckBox
            name="type"
            label="Fazer cadastro como médico?"
            id="type"
            onChange={handleCheckBox}
          />

          {isChecked && (
            <>
              <Input name="crm" icon={FiLock} placeholder="Crm" type="text" />
              <Input
                name="medical_specialty"
                icon={FiLock}
                placeholder="Especialidade médica"
                type="text"
              />
            </>
          )}

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiLogIn />
          Fazer Login
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
