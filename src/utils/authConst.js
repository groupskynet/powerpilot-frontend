const CONFIGURATION = {
  client_id: 'dar',
  redirect_uri: `${window.location.origin}/authentication/callback`,
  silent_redirect_uri: `${window.location.origin}/authentication/silent-callback`,
  scope: 'openid',
  authority: 'http://localhost:8085/auth/realms/group-sckynet',
  refresh_time_before_tokens_expiration_in_second: 70,
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false
};

export default CONFIGURATION;
