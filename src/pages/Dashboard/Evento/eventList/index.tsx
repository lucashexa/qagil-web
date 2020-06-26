import React from 'react';
import Button from '../../../../components/Button';
import {
  Card,
  Image,
  Title,
  Description,
  SeeEvent,
  TitlePage,
  ContainerContentCard,
} from './styles';
import { Container, AnimationContainer } from '../../../SignUp/styles';

const EventList: React.FC = () => {
  return (
    <Container>
      <AnimationContainer>
        <TitlePage>Meus Eventos</TitlePage>
        <Card>
          <Image />
          <ContainerContentCard>
            <Title>PLAYGROUND</Title>
            <Description>
              blablala blablala blablala blablala blablala blablala blablala
              blablala blablala blablala blablala blablala blablala blablala
              blablala blablala blablala blablala{' '}
            </Description>
            <SeeEvent>Ver Evento</SeeEvent>
          </ContainerContentCard>
        </Card>
        <Button> Criar novo Evento </Button>
      </AnimationContainer>
    </Container>
  );
};

export default EventList;
