import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';

function OidcSecure({ children }) {
  const { keycloak, initialized } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  useEffect(() => {
    if (initialized && !keycloak.authenticated) keycloak.login();
  }, [keycloak, initialized]);

  return isLoggedIn ? children : null;
}

export default OidcSecure;
