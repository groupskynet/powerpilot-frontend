import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal from '@ebay/nice-modal-react';
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import CONFIGURATION from './utils/authConst';

ReactDOM.render(
  <React.StrictMode>
    <OidcProvider configuration={CONFIGURATION}>
      <ChakraProvider>
        <NiceModal.Provider>
          <Router>
            <OidcSecure>
              <App />
            </OidcSecure>
          </Router>
        </NiceModal.Provider>
      </ChakraProvider>
    </OidcProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
