import React from 'react';
import CreateEvent from '../EndPoints/createEvent';
import UpdateEvent from '../EndPoints/updateEvent';
import CreateUserEvent from '../EndPoints/createUserEvent';
import RemoveEvent from '../EndPoints/deleteEvent';

import { List } from './styles';

const Dashboard: React.FC = () => {
  const [formAtual, setFormAtual] = React.useState('createEvent');
  const telas: { [key: string]: any } = {
    createEvent: <CreateEvent />,
    updateEvent: <UpdateEvent />,
    createUserEvent: <CreateUserEvent />,
    removeEvent: <RemoveEvent />,
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
        <span onClick={() => setFormAtual('removeEvent')}>
          Delete Event
        </span>{' '}
        <br />
        <span onClick={() => setFormAtual('createUserEvent')}>
          Create User Event
        </span>{' '}
        <br />
      </List>
    </>
  );
};

export default Dashboard;
