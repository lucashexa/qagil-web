import React, { createContext, useState, useContext } from 'react';

interface EventContextData {
  event: IEvent | null;
  setEvent(object: EventState): void;
}

export interface EventState {
  event: object | null;
  id: string;
  description: string;
  email: string;
}

interface IEvent {
  id: string;
  description: string;
  email: string;
}

const EventContext = createContext<EventContextData>({} as EventContextData);

const EventProvider: React.FC = ({ children }) => {
  const [event, setEvent] = useState<EventState | null>(null);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};

function useEvent(): EventContextData {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must be used within an EventProvuder');
  }

  return context;
}

export { EventProvider, useEvent };
