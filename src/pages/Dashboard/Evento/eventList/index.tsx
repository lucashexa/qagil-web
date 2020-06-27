import React from 'react';
import {
  Card,
  Image,
  Title,
  Description,
  SeeEvent,
  TitlePage,
  ContainerContentCard,
  Content,
  ButtonCreate,
} from './styles';
import { Container, AnimationContainer } from '../../../SignUp/styles';

import { useEventsUser } from '../../../../hooks/eventsUser';

interface Icard {
  name: string;
  description: string;
  image_url: string;
}

interface iEvent {
  addEvent: boolean;
  setAddEvent(arg: boolean): void;
}

interface ICreateEventList {
  addEvent: boolean;
}

const EventList: React.FC<iEvent> = (props) => {
  const { EventsUser } = useEventsUser() as any;
  const { addEvent, setAddEvent } = props as iEvent;

  return (
    <Container>
      <AnimationContainer>
        <TitlePage>Meus Eventos</TitlePage>
        <Content>
          {EventsUser.map((card: Icard) => (
            <Card>
              <Image imageUrl={card.image_url} />
              <ContainerContentCard>
                <Title>{card.name}</Title>
                <Description>{card.description}</Description>
                <SeeEvent>Ver Evento</SeeEvent>
              </ContainerContentCard>
            </Card>
          ))}
        </Content>
        <ButtonCreate onClick={() => setAddEvent(true)}>
          {' '}
          Criar novo Evento{' '}
        </ButtonCreate>
      </AnimationContainer>
    </Container>
  );
};

export default EventList;
