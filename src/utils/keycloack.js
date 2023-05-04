import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  //url: 'https://keycloak.groupskynet.site/auth',
  url: 'http://localhost:8085',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
