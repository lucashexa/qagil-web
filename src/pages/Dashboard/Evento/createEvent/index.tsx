import React, { useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { apiQevent, apiQimage } from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';
import { useEvent, EventState } from '../../../../hooks/event';
import { useUserBackend } from '../../../../hooks/userBackend';

import getValidarionErrors from '../../../../utils/getValidationErrors';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { Container, Content, AnimationContainer } from '../../../SignUp/styles';

import eventUserInformations from '../../../../utils/eventUserInformations';

import { useEventsUser } from '../../../../hooks/eventsUser';

import { BackgroundInput, InputFile, ContainerEvent } from './styles';

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
  file: string;
}

interface fileResponse {
  file_name: string;
  url: string;
}

interface iEvent {
  addEvent: boolean;
  setAddEvent(arg: boolean): void;
}

const CreateEvent: React.FC<iEvent> = (props) => {
  const { setAddEvent } = props as iEvent;
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { setEventsUser } = useEventsUser();
  const [fileResponse, setFileResponse] = useState<fileResponse>(
    {} as fileResponse,
  );

  const { userBackEnd } = useUserBackend();
  const { user_id } = userBackEnd as { user_id: string };

  const handleSubmit = async (data: CreateEventFormData) => {
    try {
      formRef.current?.setErrors({});

      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          apikey: process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
          user_id,
        },
      };

      const dataQEvent = {
        name: data.name,
        description: data.description,
        email: data.email,
        image_url: fileResponse.url || '',
      };
      {
        const response = await apiQevent.post('/', dataQEvent, config);
        console.log(response);
        addToast({
          type: 'success',
          title: 'Evento Criado com sucesso',
        });

        //Refactor
        eventUserInformations(user_id).then((response) => {
          setEventsUser(response.data);
          setAddEvent(false);
        });
      }
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
  };

  const handleFile = async (e: any) => {
    if (fileResponse.url) {
      removeImg();
    }
    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        user_id,
        type: 'qagile-art-event',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await apiQimage.post('/v1', formData, config);
    console.log(response);
    await setFileResponse(response.data);
  };

  const removeImg = async () => {
    const configImg = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        user_id,
        type: 'qagile-art-event',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await apiQimage.delete(
      `/v1/${fileResponse.file_name}`,
      configImg,
    );
    console.log(response);
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Evento</h1>

            <ContainerEvent>
              <BackgroundInput fileResponse={fileResponse}>
                <InputFile
                  name="file"
                  type="file"
                  onChange={(e: any) => handleFile(e)}
                />
              </BackgroundInput>
            </ContainerEvent>
            <Input name="name" type="text" placeholder="Nome" />
            <Input name="description" type="text" placeholder="Descrição" />
            <Input name="email" type="text" placeholder="E-Mail" />

            <Button type="submit">Criar</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateEvent;
