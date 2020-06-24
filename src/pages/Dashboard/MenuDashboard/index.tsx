import React from 'react';

import { Container, ButtonMenu } from './styles';

interface IMenuDashboard {
  setContent: any;
  content: string;
}

const MenuDashboard: React.FC<IMenuDashboard> = (props) => {
  const { content, setContent } = props;
  return (
    <Container>
      <ButtonMenu
        active={content === 'profile'}
        onClick={() => {
          setContent('profile');
        }}
      >
        Meu Perfil
      </ButtonMenu>
      <ButtonMenu
        active={content === 'event'}
        onClick={() => {
          setContent('event');
        }}
      >
        Eventos
      </ButtonMenu>
      <ButtonMenu
        active={content === 'history'}
        onClick={() => {
          setContent('history');
        }}
      >
        Historico
      </ButtonMenu>

      <ButtonMenu
        active={content === 'more'}
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
