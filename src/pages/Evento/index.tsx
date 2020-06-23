import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { apiQevent, apiQimage } from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useEvent, EventState } from '../../hooks/event';
import { useUserBackend } from '../../hooks/userBackend';

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
  file: string;
}

interface IuserBackEnd {
  user_id: number;
}

interface fileResponse {
  file_name: string;
  url: string;
}

const Event: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [userId, setUserId] = useState<number>();
  const { event, setEvent } = useEvent();
  const [firstRegister, setFirstRegister] = useState<boolean>(true);
  const [onEditMode, setOnEditMode] = useState<boolean>(true);
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

  const backgroundCSS = {
    backgroundImage: `url("${
      fileResponse.url
        ? fileResponse.url
        : 'https://cdn5.vectorstock.com/i/thumb-large/76/79/your-logo-here-placeholder-symbol-vector-26077679.jpg'
    } "`,
    backgroundPosition: 'center',
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    cursor: 'pointer',
    backgroundRepeat: 'no-repeat',
  };

  const inputCSS = {
    zIndex: -1,
    opacity: 0,
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    cursor: 'pointer',
    margin: 'auto',
    marginTop: '10px',
  };

  const handleFile = async (e: any) => {
    // Todo Se alterar a imagem, precisa ser excluida a antiga

    if (fileResponse.url) {
      removeImg();
    }
    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
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
          apikey: process.env.REACT_APP_API_KEY,
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

      if (onEditMode && !firstRegister) {
        const response = await apiQevent.put(
          `/${event?.id}`,
          dataQEvent,
          config,
        );
        setEvent(response.data);
        addToast({
          type: 'success',
          title: 'Evento editado com sucesso',
        });
      } else {
        const response = await apiQevent.post('/', dataQEvent, config);
        setEvent(response.data);
        addToast({
          type: 'success',
          title: 'Evento Criado com sucesso',
        });
        setFirstRegister(false);
      }
      setOnEditMode(false);
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
        apikey: process.env.REACT_APP_API_KEY,
        user_id: userId,
        type: 'qagile-art-event',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    await apiQimage.delete(`/v1/${fileResponse.file_name}`, configImg);

    if (event) {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          apikey: process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
          user_id: userId,
        },
      };
      const dataQEvent = {
        image_url: '',
      };
      const response = await apiQevent.put(`/${event.id}`, dataQEvent, config);

      console.log(response);
    } else {
      console.log('nao entrei');
    }
  };

  const handleEditEvent = async () => {
    setOnEditMode(true);
  };

  const handleDeleteEvent = async () => {
    try {
      formRef.current?.setErrors({});

      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          apikey: process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
          user_id: userId,
        },
      };

      const response = await apiQevent.delete(`/${event?.id}`, config);

      console.log(response.data);

      setFileResponse({} as fileResponse);

      addToast({
        type: 'success',
        title: 'Evento deletado com sucesso',
      });

      setEvent({} as EventState);
      setOnEditMode(true);
      setFirstRegister(true);
      removeImg();
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

  return (
    <>
      {/* {event || !onEditMode ? ( */}
      {!event || onEditMode ? (
        //edit mode
        <Container>
          <Content>
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Evento</h1>

                <div
                  style={{
                    margin: 'auto',
                    maxWidth: '100px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={backgroundCSS}>
                    <input
                      style={inputCSS}
                      name="file"
                      type="file"
                      onChange={(e) => handleFile(e)}
                    />
                  </div>
                </div>
                <Input name="name" type="text" placeholder="Nome" />
                <Input name="description" type="text" placeholder="Descrição" />
                <Input name="email" type="text" placeholder="E-Mail" />

                <Button type="submit">
                  {onEditMode && !firstRegister ? 'Editar' : 'Criar'} Evento
                </Button>
                {onEditMode && !firstRegister && (
                  <Button type="button" onClick={() => setOnEditMode(false)}>
                    {' '}
                    Cancelar Edição{' '}
                  </Button>
                )}
              </Form>
            </AnimationContainer>
          </Content>
        </Container>
      ) : (
        //card mode
        <Container>
          <Content>
            <AnimationContainer>
              {/* <h1>Informações do evento do(a) {event.name} </h1> */}
              <div
                style={{
                  display: 'flex',
                  marginTop: '20px',
                  border: '2px solid #ff9000',
                  borderRadius: '10px',
                  width: '400px',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  padding: '10px',
                  flex: 1,
                }}
              >
                <div style={backgroundCSS}>
                  <input
                    style={inputCSS}
                    name="file"
                    type="file"
                    onChange={(e) => handleFile(e)}
                  />
                </div>

                {/* <button onClick={handleRemoveImage}> remove image</button> */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{'event.description'}</span>
                  <span>{'event.email'}</span>
                </div>
              </div>
              <Button type={'button'} onClick={handleEditEvent}>
                {' '}
                Editar Evento{' '}
              </Button>
              <Button type={'button'} onClick={handleDeleteEvent}>
                {' '}
                excluir evento{' '}
              </Button>
            </AnimationContainer>
          </Content>
        </Container>
      )}
    </>
  );
};

export default Event;
