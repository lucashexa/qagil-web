import React from 'react';

import { Container, ButtonMenu } from './styles';

const MenuDashboard: React.FC = () => {
  return (
    <Container>
      <ButtonMenu>Meu Perfil</ButtonMenu>
      <ButtonMenu>Eventos</ButtonMenu>
      <ButtonMenu>Historico</ButtonMenu>
      <ButtonMenu>Mais</ButtonMenu>
    </Container>
  );
};

export default MenuDashboard;
