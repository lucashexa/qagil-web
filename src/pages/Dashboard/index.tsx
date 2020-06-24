import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MenuDashboard from '../../components/MenuDashboard';

import Event from './Evento';

import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';
import { useEvent } from '../../hooks/event';

import backendUserInformations from '../../utils/backendUserInformations';

import { Content } from './styles';

const Dashboard: React.FC = () => {
  const { userBackEnd, setUserBackEnd } = useUserBackend();
  const { user } = useAuth();
  const { event } = useEvent();

  if (!userBackEnd) {
    const { email } = user as { email: string };
    backendUserInformations(email).then((response) => {
      console.log(response.data);
      setUserBackEnd(response.data);
    });
  }

  console.log(userBackEnd);

  return (
    <>
      <MenuDashboard />
      <Header />
      <Content>
        <Event />
      </Content>
      <Footer />
    </>
  );
};

export default Dashboard;
