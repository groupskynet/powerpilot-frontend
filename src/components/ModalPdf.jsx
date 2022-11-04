import React, { useEffect, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import FileService from '../services/FileServices';

export default NiceModal.create(({ soporte }) => {
  const modal = useModal();
  const [file, setFile] = useState('');

  useEffect(() => {
    (async () => {
      const data = await FileService.get(soporte);
      setFile(data);
    })();
  }, [soporte]);

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.hide()}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <div className="flex items-center flex-col my-4">
            <iframe title="view pdf" width="100%" height="500px" src={file} />
            <div className="flex mt-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  modal.hide();
                }}
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
