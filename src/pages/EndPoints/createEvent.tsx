import React, { useCallback, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { apiQevent } from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidarionErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from '../SignUp/styles';

interface CreateEventFormData {
  name: string;
  description: string;
  email: string;
  image_url: string;
  address: string;
  city: string;
  neighborhood: string;
  state: string;
  lat: number;
  lng: number;
}
const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateEventFormData) => {
      try {
        formRef.current?.setErrors({});

        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
            'Content-Type': 'application/json',
            user_id: 9,
          },
        };

        const dataQEvent = {
          name: data.name,
          description: data.description,
          email: data.email,
          image_url: data.image_url,
          place: {
            address: data.address,
            city: data.city,
            location: {
              lat: data.lat,
              lng: data.lng,
            },
            neighborhood: data.neighborhood,
            state: data.state,
          },
        };

        console.log(dataQEvent);

        await apiQevent.post('/v1/company', dataQEvent, config);

        addToast({
          type: 'success',
          title: 'Evento Criado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidarionErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'erro na autenticação',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Criar Evento</h1>

            <Input name="name" type="text" placeholder="Nome" />
            <Input name="description" type="text" placeholder="Descrição" />
            <Input name="email" type="text" placeholder="E-Mail" />
            <Input name="image" type="text" placeholder="Url da imagem" />
            <Input name="adress" type="text" placeholder="Rua" />
            <Input name="city" type="text" placeholder="Cidade" />
            <Input name="lat" type="text" placeholder="Latitude" />
            <Input name="lng" type="text" placeholder="Logitude" />
            <Input name="neighborhood" type="text" placeholder="Neighborhood" />
            <Input name="state" type="text" placeholder="State" />

            <Button type="submit">Criar Evento</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateEvent;
