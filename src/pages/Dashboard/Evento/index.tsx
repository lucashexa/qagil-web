import React, { useState } from 'react';
import CreateEvent from './createEvent';
import EventList from './eventList';

import { useEventsUser } from '../../../hooks/eventsUser';

const Event: React.FC = () => {
  const [addEvent, setAddEvent] = useState(false);
  const { EventsUser } = useEventsUser() as any;
  console.log('EventsUser', EventsUser);
  // const events

  return (
    <>
      {!EventsUser?.length || addEvent ? (
        <CreateEvent addEvent={addEvent} setAddEvent={setAddEvent} />
      ) : (
        <EventList addEvent={addEvent} setAddEvent={setAddEvent} />
      )}
    </>
  );
};

export default Event;
