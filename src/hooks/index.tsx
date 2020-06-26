import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { UserBackendProvider } from './userBackend';
import { EventProvider } from './event';
import { EventsUserProvider } from './eventsUser';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <UserBackendProvider>
      <EventProvider>
        <EventsUserProvider>
          <ToastProvider>{children}</ToastProvider>
        </EventsUserProvider>
      </EventProvider>
    </UserBackendProvider>
  </AuthProvider>
);

export default AppProvider;
