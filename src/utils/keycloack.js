import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8085/auth',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
