import React from 'react';
import '../assets/modal.css';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

export default NiceModal.create(({ soporte }) => {
  const modal = useModal();
  return (
    <Modal>
      <ModalOverlay />
      <ModalContent />
    </Modal>
  );
});
