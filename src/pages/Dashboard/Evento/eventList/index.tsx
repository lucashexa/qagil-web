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
  Content,
} from './styles';
import { Container, AnimationContainer } from '../../../SignUp/styles';

import { useEventsUser } from '../../../../hooks/eventsUser';

interface Icard {
  name: string;
  description: string;
  image_url: string;
}

const EventList: React.FC = () => {
  const { EventsUser } = useEventsUser() as any;

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
        <Button> Criar novo Evento </Button>
      </AnimationContainer>
    </Container>
  );
};

export default EventList;
