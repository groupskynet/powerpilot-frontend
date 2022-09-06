import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://3.21.165.104:8085/auth',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
