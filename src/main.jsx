import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal from '@ebay/nice-modal-react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <NiceModal.Provider>
        <Router>
          <App />
        </Router>
      </NiceModal.Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
