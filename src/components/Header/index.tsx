import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import { AiOutlinePoweroff } from 'react-icons/all';
import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';
import { apiQimage, apiQuser } from '../../services/api';

import _ from 'lodash';

import {
  Container,
  Logo,
  ProfileInfos,
  SubContainer,
  UserName,
  BackgroundInput,
  InputFile,
} from './styles';

interface IuserBackEnd {
  user_id: number;
  image: string;
}

interface fileResponse {
  file_name?: string;
  url?: string;
}

interface IHeader {
  content: string;
}

const Header: React.FC<IHeader> = (props) => {
  const { content } = props;
  const { singOut, user }: any = useAuth();
  const { userBackEnd, setUserBackEnd } = useUserBackend();
  const [userId, setUserId] = useState<number>();
  const [fileResponse, setFileResponse] = useState<fileResponse>(
    {} as fileResponse,
  );

  console.log(content, 'header');

  //updating informations of user
  if (userBackEnd) {
    const { user_id, image } = userBackEnd as IuserBackEnd;

    if (_.isEqual(fileResponse, {}) && image) {
      setFileResponse({
        url: image,
      });
      console.log('fileResponse', fileResponse);
    }

    if (!userId) {
      setUserId(user_id);
    }
  }

  const handleSingOut = () => {
    setUserBackEnd(null);
    singOut();
  };

  //remove Image if already existis from Database
  const removeImage = async (r: any) => {
    const regexImg = /\/\/(.*?)\/(.*?)\/(.*?)(.*)/g.exec(r);

    const name = regexImg && regexImg[regexImg.length - 1];

    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        user_id: userId,
        type: 'qagile-art-profile',
      },
    };

    const response = await apiQimage.delete(`/v1/${name}`, config);
    console.log(response);

    console.log('Imagem Deletada', response);
  };

  const handleFile = async (e: any) => {
    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    const config = {
      headers: {
        apikey: process.env.REACT_APP_API_KEY,
        user_id: userId,
        type: 'qagile-art-profile',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await apiQimage.post('/v1', formData, config);
    console.log(response);

    if (fileResponse.url) {
      await removeImage(fileResponse.url);
    }

    await setFileResponse(response.data);
  };

  const updateUser = async () => {
    if (userId) {
      const dataUpdateImg = {
        image: fileResponse.url,
      };

      const configUpdateImg = {
        headers: {
          apikey: process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
        },
      };

      const responseUser = await apiQuser.put(
        `/v1/user/update/${userId}`,
        dataUpdateImg,
        configUpdateImg,
      );

      console.log(responseUser);
    }
  };

  useEffect(() => {
    updateUser();
  }, [fileResponse]);

  return (
    <Container>
      <SubContainer>
        <Logo src={logoImg} alt="QAgil" />

        <ProfileInfos hasContent={content === 'profile'}>
          <BackgroundInput fileResponse={fileResponse}>
            <InputFile
              name="file"
              type="file"
              onChange={(e) => handleFile(e)}
            />
          </BackgroundInput>
          {content !== 'profile' && (
            <div>
              <span>Bem Vindo</span>
              <UserName>{user.name}</UserName>
            </div>
          )}
        </ProfileInfos>
      </SubContainer>
      <AiOutlinePoweroff onClick={handleSingOut} />
    </Container>
  );
};

export default Header;
