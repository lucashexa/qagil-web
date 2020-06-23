import React from 'react';
import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <span>
        © {new Date().getFullYear()} QAgil - Todos os direitos reservados
      </span>
    </Container>
  );
};

export default Footer;
