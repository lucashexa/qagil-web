import React from 'react';
import CreateEvent from '../EndPoints/createEvent';
import UpdateEvent from '../EndPoints/updateEvent';

import { List } from './styles';

const Dashboard: React.FC = () => {
  const [formAtual, setFormAtual] = React.useState('createEvent');
  const telas: { [key: string]: any } = {
    createEvent: <CreateEvent />,
    updateEvent: <UpdateEvent />,
  };

  return (
    <>
      {telas[formAtual]}

      <List>
        <h1>Event Services</h1>
        <span onClick={() => setFormAtual('createEvent')}>
          Create Event
        </span>{' '}
        <br />
        <span onClick={() => setFormAtual('updateEvent')}>
          Update Event
        </span>{' '}
        <br />
      </List>
    </>
  );
};

export default Dashboard;
