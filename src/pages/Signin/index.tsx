import React, { useRef, useCallback, useContext } from 'react';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import getValidarionErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

interface SingInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { singIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Email Obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        console.log(err);

        const errors = getValidarionErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [singIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="QAgil" />

        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Faça Seu Logon</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-Mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="account">
          <FiLogIn />
          Criar Conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
