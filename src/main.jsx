import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal from '@ebay/nice-modal-react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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
