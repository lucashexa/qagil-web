import React from 'react';
import logoImg from '../../assets/logo.png';
import { AiOutlinePoweroff } from 'react-icons/all';
import { useUserBackend } from '../../hooks/userBackend';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Logo,
  ProfileInfos,
  SubContainer,
  UserName,
} from './styles';

const Header: React.FC = () => {
  const { userBackEnd }: any = useUserBackend();
  const { singOut, user }: any = useAuth();
  console.log(user);

  return (
    <Container>
      <SubContainer>
        <Logo src={logoImg} alt="QAgil" />

        <ProfileInfos>
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            alt="profile Picture"
          />
          <div>
            <span>Bem Vindo</span>
            {userBackEnd && <UserName>{user.name}</UserName>}
          </div>
        </ProfileInfos>
      </SubContainer>
      <AiOutlinePoweroff onClick={singOut} />
    </Container>
  );
};

export default Header;
