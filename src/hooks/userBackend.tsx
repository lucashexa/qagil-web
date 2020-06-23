import React, { createContext, useCallback, useState, useContext } from 'react';

interface UserBackendContextData {
  userBackEnd: object | null;
  setUserBackEnd(object: UserBackendState | null): void;
}

export interface UserBackendState {
  user: object;
}

const UserBackendContext = createContext<UserBackendContextData>(
  {} as UserBackendContextData,
);

const UserBackendProvider: React.FC = ({ children }) => {
  const [userBackEnd, setUserBackEnd] = useState<UserBackendState | null>(null);

  return (
    <UserBackendContext.Provider value={{ userBackEnd, setUserBackEnd }}>
      {children}
    </UserBackendContext.Provider>
  );
};

function useUserBackend(): UserBackendContextData {
  const context = useContext(UserBackendContext);

  if (!context) {
    throw new Error(
      'useUserBackend must be used within an UserBackendProvuder',
    );
  }

  return context;
}

export { UserBackendProvider, useUserBackend };
