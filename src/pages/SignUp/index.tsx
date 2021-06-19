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

import { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import Modal from '../../components/Modal';
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
}

interface MedicalSpecialty {
  id: number;
  name: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [isChecked, setIsChecked] = useState(false);
  const [medSpecialties, setMedSpecialties] = useState<MedicalSpecialty[]>([]);
  const [selectedMedSpec, setSelectedMedSpec] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get<MedicalSpecialty[]>('/medical-specialty').then(response => {
      setMedSpecialties(response.data);
    });
  });

  const handleSelectMedSpec = useCallback(e => {
    setSelectedMedSpec(e);
  }, []);

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

        if (userType === 'doctor') {
          const { id } = user.data;

          if (!selectedMedSpec) {
            addToast({
              type: 'error',
              title: 'Erro no cadastro',
              description: 'Selecione a especialidade médica.',
            });
            return;
          }

          const doctorData = {
            id,
            type: userType,
            crm,
            medical_specialty: Number(selectedMedSpec.charAt(0)),
          };

          const doctor = await api.post('/doctors', doctorData);
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
    [addToast, history, selectedMedSpec],
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
              <div className="specialty-wrapper">
                <span>Especialidade médica: </span>
                <button
                  id="medical-specialty-button"
                  className="medical-specialty-button"
                  type="button"
                  onClick={() => setShowModal(!showModal)}
                >
                  {selectedMedSpec || 'Selecione a Especialidade Médica'}
                </button>
              </div>
            </>
          )}

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiLogIn />
          Fazer Login
        </Link>
      </Content>
      <Modal
        title="Selecione a Especialidade"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {medSpecialties.map(medSpec => (
          <button
            type="button"
            key={medSpec.id}
            onClick={() => {
              setSelectedMedSpec(`${medSpec.id}. ${medSpec.name}`);
              setShowModal(!showModal);
            }}
          >
            {`${medSpec.id}. ${medSpec.name}`}
          </button>
        ))}
      </Modal>
    </Container>
  );
};

export default SignIn;
