import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { UserBackendProvider } from './userBackend';
import { EventProvider } from './event';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <UserBackendProvider>
      <EventProvider>
        <ToastProvider>{children}</ToastProvider>
      </EventProvider>
    </UserBackendProvider>
  </AuthProvider>
);

export default AppProvider;
