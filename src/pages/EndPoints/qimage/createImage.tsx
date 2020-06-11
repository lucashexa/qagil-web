import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { apiQimage } from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidarionErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimationContainer } from '../../SignUp/styles';

import { useUserBackend } from '../../../hooks/userBackend';

interface CreateImageFormData {
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
const CreateImage: React.FC = () => {
  const [file, setFile] = useState<any>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { userBackEnd } = useUserBackend();
  console.log(userBackEnd);

  const handleSubmit = async (data: CreateImageFormData) => {
    try {
      formRef.current?.setErrors({});

      // console.log(file);

      let formData = new FormData();

      formData.append('file', file);

      const config = {
        headers: {
          apikey: 'a6ad62eb-d6d7-4b05-85fa-d1da8c5d7c6e',
          user_id: 10,
          type: 'teste',
          'Content-Type': 'application/x-www-form-urlencoded',
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

      const response = await apiQimage.post('/v1', formData, config);

      console.log(response.data);

      addToast({
        type: 'success',
        title: 'Foto Criada com sucesso',
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

  const handleFile = (e: any) => {
    const fileInputed = e.target.files[0];
    setFile(fileInputed);
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>CreateImage</h1>

            <Input
              name="file"
              type="file"
              placeholder="Selecione"
              onChange={(e) => handleFile(e)}
            />

            <Button type="submit">CreateImage</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreateImage;
