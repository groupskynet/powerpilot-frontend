import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal from '@ebay/nice-modal-react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import keycloak from './utils/keycloack';
import OidcSecure from './components/OdicSecure';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <ChakraProvider>
        <NiceModal.Provider>
          <OidcSecure>
            <Router>
              <App />
            </Router>
          </OidcSecure>
        </NiceModal.Provider>
      </ChakraProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
