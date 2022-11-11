import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://dar-keycloack.groupskynet.site',
  realm: 'dar',
  clientId: 'dar-web'
});

export default keycloak;
