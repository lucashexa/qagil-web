import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidarionErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Email Obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);

      const errors = getValidarionErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="QAgil" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça Seu Cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="E-Mail" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-Mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="account">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SingUp;
