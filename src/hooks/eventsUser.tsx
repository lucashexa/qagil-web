import React, { createContext, useState, useContext } from 'react';

interface EventsUserContextData {
  EventsUser: object | null;
  setEventsUser(object: EventsUserState | null): void;
}

export interface EventsUserState {
  [events: number]: object;
}

const EventsUserContext = createContext<EventsUserContextData>(
  {} as EventsUserContextData,
);

const EventsUserProvider: React.FC = ({ children }) => {
  const [EventsUser, setEventsUser] = useState<EventsUserState | null>(null);

  return (
    <EventsUserContext.Provider value={{ EventsUser, setEventsUser }}>
      {children}
    </EventsUserContext.Provider>
  );
};

function useEventsUser(): EventsUserContextData {
  const context = useContext(EventsUserContext);

  if (!context) {
    throw new Error('useEventsUser must be used within an EventsUserProvuder');
  }

  return context;
}

export { EventsUserProvider, useEventsUser };
