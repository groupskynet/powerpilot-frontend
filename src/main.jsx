import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal from '@ebay/nice-modal-react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import keycloak from './utils/keycloack';
import OidcSecure from './components/OdicSecure';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <ChakraProvider>
        <NiceModal.Provider>
          <Router>
            <OidcSecure>
              <App />
            </OidcSecure>
          </Router>
        </NiceModal.Provider>
      </ChakraProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
