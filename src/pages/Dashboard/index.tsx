import React, { useEffect } from 'react';
import CreateEvent from '../EndPoints/qevent/createEvent';
import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';

import backendUserInformations from '../../utils/backendUserInformations';

const Dashboard: React.FC = () => {
  const { userBackEnd, setUserBackEnd } = useUserBackend();
  const { user } = useAuth();

  if (!userBackEnd) {
    const { email } = user as { email: string };
    backendUserInformations(email).then((response) => {
      console.log(response.data);
      setUserBackEnd(response.data);
    });
  }

  return (
    <>
      <Header />
      <CreateEvent />
    </>
  );
};

export default Dashboard;
