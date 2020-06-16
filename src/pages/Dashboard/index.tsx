import React, { useEffect } from 'react';
import CreateEvent from '../EndPoints/qevent/createEvent';
import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { useUserBackend } from '../../hooks/userBackend';
import { useEvent } from '../../hooks/event';

import backendUserInformations from '../../utils/backendUserInformations';

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

  return (
    <>
      <Header />
      <CreateEvent />
      {event && <h1>teste</h1>}
    </>
  );
};

export default Dashboard;
