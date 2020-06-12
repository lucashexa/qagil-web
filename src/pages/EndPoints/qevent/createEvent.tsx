import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { apiQevent, apiQimage } from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidarionErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimationContainer } from '../../SignUp/styles';

import { useUserBackend } from '../../../hooks/userBackend';
import { getDiffieHellman } from 'crypto';
import { StringifyOptions } from 'querystring';

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

interface IuserBackEnd {
  user_id: number;
}

interface fileResponse {
  file_name: string;
  url: string;
}

const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [userId, setUserId] = useState<number>();
  const [event, setEvent] = useState<any>();
  const [fileResponse, setFileResponse] = useState<fileResponse>(
    {} as fileResponse,
  );
  const { userBackEnd } = useUserBackend();
  if (userBackEnd) {
    const { user_id } = userBackEnd as IuserBackEnd;
    if (!userId) {
      setUserId(user_id);
    }
  }

  const handleFile = async (e: any) => {
    // Todo Se alterar a imagem, precisa ser excluida a antiga

    if (fileResponse.url) {
      removeImg();
    }
    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    const config = {
      headers: {
        apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
        user_id: userId,
        type: 'qagile-art-event',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await apiQimage.post('/v1', formData, config);
    await setFileResponse(response.data);
  };

  const handleSubmit = async (data: CreateEventFormData) => {
    try {
      formRef.current?.setErrors({});

      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
          'Content-Type': 'application/json',
          user_id: userId,
        },
      };

      const dataQEvent = {
        name: data.name,
        description: data.description,
        email: data.email,
        image_url: fileResponse.url,
        place: {
          address: '',
          city: '',
          location: {
            lat: 0,
            lng: 0,
          },
          neighborhood: '',
          state: '',
        },
      };

      const response = await apiQevent.post('/', dataQEvent, config);

      setEvent(response.data);

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
  };

  const handleRemoveImage = async () => {
    await removeImg();
    setFileResponse({} as fileResponse);
  };

  const removeImg = async () => {
    const configImg = {
      headers: {
        apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
        user_id: userId,
        type: 'qagile-art-event',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    await apiQimage.delete(`/v1/${fileResponse.file_name}`, configImg);

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
        'Content-Type': 'application/json',
        user_id: userId,
      },
    };

    const dataQEvent = {
      image_url: '',
    };
    const response = await apiQevent.put(`/${event.id}`, dataQEvent, config);

    console.log(response);
  };

  return (
    <>
      {event ? (
        <Container>
          <Content>
            <AnimationContainer>
              <h1>Criar Evento</h1>
              <span>{event.description}</span>
              <span>{event.email}</span>
              {fileResponse.url ? (
                <>
                  <img src={fileResponse.url} />
                  <button onClick={handleRemoveImage}> remove image</button>
                  <input
                    name="file"
                    type="file"
                    placeholder="Alterar imagem"
                    onChange={(e) => handleFile(e)}
                  />
                </>
              ) : (
                <input
                  name="file"
                  type="file"
                  placeholder="Selecione uma imagem para o Evento"
                  onChange={(e) => handleFile(e)}
                />
              )}
            </AnimationContainer>
          </Content>
        </Container>
      ) : (
        <Container>
          <Content>
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>createEvent</h1>

                <Input name="name" type="text" placeholder="Nome" />
                <Input name="description" type="text" placeholder="Descrição" />
                <Input name="email" type="text" placeholder="E-Mail" />
                <Input
                  name="file"
                  type="file"
                  placeholder="Selecione uma imagem para o Evento"
                  onChange={(e) => handleFile(e)}
                />

                <Button type="submit">createEvent</Button>
              </Form>
            </AnimationContainer>
          </Content>
        </Container>
      )}
    </>
  );
};

export default CreateEvent;
