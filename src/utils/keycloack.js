import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak.groupskynet.site',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
