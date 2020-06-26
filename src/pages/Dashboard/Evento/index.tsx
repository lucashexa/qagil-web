import React from 'react';
import CreateEvent from './createEvent';
import EventList from './eventList';

import { useEventsUser } from '../../../hooks/eventsUser';

const Event: React.FC = () => {
  const { EventsUser } = useEventsUser() as any;
  console.log('EventsUser', EventsUser);
  // const events

  return <>{!EventsUser.length ? <CreateEvent /> : <EventList />}</>;
};

export default Event;
