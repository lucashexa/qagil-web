import React from 'react';
import { Container, Content, Background } from './styles';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SingUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="QAgil" />

        <Form onSubmit={handleSubmit}>
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
