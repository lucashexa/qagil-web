import React from 'react';
import { Container, Content, Background } from './styles';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="QAgil" />
      <form>
        <h1>Faça Seu Logon</h1>
        <input type="text" placeholder="E-Mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <a href="forgot">Esqueci minha senha</a>
      </form>
      <a href="account">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
