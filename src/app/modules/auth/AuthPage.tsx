import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthPage = () => {
  const { loginWithRedirect } = useAuth0();

  // Automatically trigger login as soon as component is mounted
  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
  null
  );
};

export { AuthPage };
