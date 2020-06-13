import React, { useEffect } from 'react';
import CreateEvent from '../EndPoints/qevent/createEvent';
import Header from '../../components/Header';
import UpdateEvent from '../EndPoints/qevent/updateEvent';
import CreateUserEvent from '../EndPoints/qevent/createUserEvent';
import RemoveEvent from '../EndPoints/qevent/deleteEvent';

import CreateUserEventUser from '../EndPoints/quser/createUserEvent';
import GetSeatchUser from '../EndPoints/quser/getSearchUser';
import GetUserEvent from '../EndPoints/quser/getUserEvent';
import UpdateEventUser from '../EndPoints/quser/updateEvent';

import CreateImage from '../EndPoints/qimage/createImage';
import DeleteImage from '../EndPoints/qimage/deleteImage';

import { List } from './styles';

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

  const [formAtual, setFormAtual] = React.useState('createEvent');
  const telas: { [key: string]: any } = {
    createEvent: <CreateEvent />,
    // updateEvent: <UpdateEvent />,
    // createUserEvent: <CreateUserEvent />,
    // removeEvent: <RemoveEvent />,

    // createUserEventUser: <CreateUserEventUser />,
    // getSearchUser: <GetSeatchUser />,
    // getUserEvent: <GetUserEvent />,
    // updateEventUser: <UpdateEventUser />,

    // createImage: <CreateImage />,
    // deleteImage: <DeleteImage />,
  };

  return (
    <>
      <Header />
      {telas[formAtual]}
      {/*
      <List>
        <div>
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
        </div>

        <div>
          <h1>User Services</h1>
          <span onClick={() => setFormAtual('createUserEventUser')}>
            createUserEventUser
          </span>{' '}
          <br />
          <span onClick={() => setFormAtual('getSearchUser')}>
            getSearchUser
          </span>{' '}
          <br />
          <span onClick={() => setFormAtual('getUserEvent')}>
            getUserEvent
          </span>{' '}
          <br />
          <span onClick={() => setFormAtual('updateEventUser')}>
            updateEventUser
          </span>{' '}
          <br />
        </div>

        <div>
          <h1>Image Services</h1>
          <span onClick={() => setFormAtual('createImage')}>
            createImage
          </span>{' '}
          <br />
          <span onClick={() => setFormAtual('deleteImage')}>
            deleteImage
          </span>{' '}
          <br />
        </div>
      </List> */}
    </>
  );
};

export default Dashboard;
