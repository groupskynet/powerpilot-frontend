import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8085',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
