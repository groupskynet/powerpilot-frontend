import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton
} from '@chakra-ui/react';

function Info({ type, message, onClose }) {
  return (
    <div className="mb-2">
      <Alert status={type}>
        <AlertIcon />
        <Box flex="1">
          <AlertDescription display="block">{message}</AlertDescription>
        </Box>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={onClose}
        />
      </Alert>
    </div>
  );
}

export default Info;
