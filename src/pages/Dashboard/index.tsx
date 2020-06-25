import React, { useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import MenuDashboard from './MenuDashboard';
import Event from './Evento';
import Profile from './Profile';
import History from './History';
import More from './More';

import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';
import { useEvent } from '../../hooks/event';

import backendUserInformations from '../../utils/backendUserInformations';

import { Content } from './styles';

const Dashboard: React.FC = () => {
  const [content, setContent] = useState('profile');
  const [requestProfile, setRequestProfile] = useState(false);
  const { userBackEnd, setUserBackEnd } = useUserBackend();
  const { user } = useAuth();
  const { event } = useEvent();

  if (!userBackEnd && !requestProfile) {
    setRequestProfile(true);
    const { email } = user as { email: string };
    backendUserInformations(email).then((response) => {
      console.log(response.data);
      setUserBackEnd(response.data);
    });
  }

  const contents: { [key: string]: any } = {
    profile: <Profile />,
    event: <Event />,
    history: <History />,
    more: <More />,
  };

  return (
    <>
      <MenuDashboard setContent={setContent} content={content} />
      <Header content={content} />
      <Content>{contents[content]}</Content>
      <Footer />
    </>
  );
};

export default Dashboard;
