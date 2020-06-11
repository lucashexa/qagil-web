import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { UserBackendProvider } from './userBackend';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <UserBackendProvider>
      <ToastProvider>{children}</ToastProvider>
    </UserBackendProvider>
  </AuthProvider>
);

export default AppProvider;
