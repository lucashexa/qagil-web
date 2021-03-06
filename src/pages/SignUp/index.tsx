import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { apiLocal, apiQuser } from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidarionErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SingUpFormData {
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email Obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
          confirmpassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não correspondem',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            apikey: process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json',
          },
        };

        const [firstName, lastName] = data.name.split(' ');
        const dataQuser = {
          email: data.email,
          first_name: firstName,
          last_name: lastName,
        };
        console.log(dataQuser);

        const response = await apiQuser.post(
          '/v1/user/create',
          dataQuser,
          config,
        );
        const response1 = await apiLocal.post('/users', data);
        console.log(response, response1);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Vocë já pode fazer seu logon!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidarionErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'erro na autenticação',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="QAgil" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça Seu Cadastro</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-Mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="confirmpassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
