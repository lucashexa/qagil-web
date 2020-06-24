import React from 'react';

import { Container, ButtonMenu } from './styles';

interface IMenuDashboard {
  setContent: any;
}

const MenuDashboard: React.FC<IMenuDashboard> = (props) => {
  const { setContent } = props;
  return (
    <Container>
      <ButtonMenu
        onClick={() => {
          setContent('profile');
        }}
      >
        Meu Perfil
      </ButtonMenu>
      <ButtonMenu
        onClick={() => {
          setContent('event');
        }}
      >
        Eventos
      </ButtonMenu>
      <ButtonMenu
        onClick={() => {
          setContent('history');
        }}
      >
        Historico
      </ButtonMenu>

      <ButtonMenu
        onClick={() => {
          setContent('more');
        }}
      >
        Mais
      </ButtonMenu>
    </Container>
  );
};

export default MenuDashboard;
