import React from 'react';
import CreateEvent from '../Evento';
import Menu from '../Evento/Menu';
import Header from '../../components/Header';

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
      <Header />
      <Content>
        <CreateEvent />
        {/* {true && <Menu />} */}
        {event && <Menu />}
      </Content>
    </>
  );
};

export default Dashboard;
