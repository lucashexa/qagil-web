import React from 'react';
import { Container, Content, Background } from './styles';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SingUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="QAgil" />

      <form>
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
      </form>
      <a href="account">
        <FiArrowLeft />
        Voltar para Logon
      </a>
    </Content>
  </Container>
);

export default SingUp;
