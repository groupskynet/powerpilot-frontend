import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.VITE_KEYCLOACK_URL,
  realm: import.meta.VITE_KEYCLOACK_REALM,
  clientId: import.meta.VITE_KEYCLOACK_CLIENT_ID
});

export default keycloak;
