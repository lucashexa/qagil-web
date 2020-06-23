import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';
import { AiOutlinePoweroff } from 'react-icons/all';
import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';
import { apiQimage, apiQuser } from '../../services/api';

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
}

interface fileResponse {
  file_name: string;
  url: string;
}

const Header: React.FC = () => {
  const { singOut, user }: any = useAuth();
  const { userBackEnd } = useUserBackend();
  const [userId, setUserId] = useState<number>();
  const [fileResponse, setFileResponse] = useState<fileResponse>(
    {} as fileResponse,
  );

  if (userBackEnd) {
    const { user_id } = userBackEnd as IuserBackEnd;
    if (!userId) {
      setUserId(user_id);
    }
  }

  const handleFile = async (e: any) => {
    console.log('fileResponse', fileResponse);
    console.log('userBackEnd', userBackEnd);
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
    await setFileResponse(response.data);
  };

  return (
    <Container>
      <SubContainer>
        <Logo src={logoImg} alt="QAgil" />

        <ProfileInfos>
          <BackgroundInput fileResponse={fileResponse}>
            <InputFile
              name="file"
              type="file"
              onChange={(e) => handleFile(e)}
            />
          </BackgroundInput>
          <div>
            <span>Bem Vindo</span>
            <UserName>{user.name}</UserName>
          </div>
        </ProfileInfos>
      </SubContainer>
      <AiOutlinePoweroff onClick={singOut} />
    </Container>
  );
};

export default Header;
