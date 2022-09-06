import React, { useEffect, useState, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import Loading from '../../components/Loading';
import TicketsServices from '../../services/TicketsServices';

export default NiceModal.create(({ ticket }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (ticket) {
        setLoading(true);
        const base64 = await TicketsServices.file(ticket.soporte);
        setFile(base64);
        setLoading(false);
      }
    })();
  }, [ticket]);

  const handleSubmit = useCallback(
    async (id) => {
      try {
        setLoading(true);
        let resp = null;
        resp = await TicketsServices.update(id);
        if (resp.status !== 200) {
          setInfo({ type: 'error', message: resp.message });
          return;
        }
        modal.resolve();
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, Por favor intentelo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    },
    [modal]
  );

  return (
    <Modal isOpen={modal.visible} size="6xl" onClose={() => modal.hide()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {ticket.estado === 'PENDIENTE'
            ? `Confirmar TICKET-${String(ticket.id).padStart(4, '0')}`
            : `TICKET-${String(ticket.id).padStart(4, '0')}`}
        </ModalHeader>
        <ModalCloseButton />
        {loading && (
          <div className="py-4">
            <Loading />
          </div>
        )}
        {!loading && (
          <ModalBody>
            {info && (
              <div className="mb-2">
                <Alert status={info.type}>
                  <AlertIcon />
                  <Box flex="1">
                    <AlertDescription display="block">
                      {info.message}
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setInfo(null)}
                  />
                </Alert>
              </div>
            )}
            <div className="w-full flex px-3 mb-6 md:mb-0">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      OPERADOR
                    </label>
                    <h2>
                      {ticket &&
                        `${ticket.operador.nombres} ${ticket.operador.apellidos}`}
                    </h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Fecha
                    </label>
                    <h2>{ticket && ticket.fecha}</h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      # Orden
                    </label>
                    <h2>
                      {ticket && `ORD-${String(ticket.orden).padStart(4, '0')}`}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Cliente
                    </label>
                    <h2>{ticket && ticket.cliente.nombres}</h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Maquina
                    </label>
                    <h2>{ticket && ticket.maquina.nombre}</h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Accesorio
                    </label>
                    <h2>{ticket && ticket.accesorio.nombre}</h2>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Horometro Inicial
                    </label>
                    <h2>{ticket && ticket.horometroInicial}</h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Horometro Final
                    </label>
                    <h2>{ticket && ticket.horometroFinal}</h2>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      horas Totales
                    </label>
                    <h2>
                      {ticket &&
                        ticket.horometroFinal - ticket.horometroInicial}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="border rounded-lg p-5 w-full">
                  <img width="100%" src={file} alt="ticket" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              {ticket.estado === 'PENDIENTE' && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleSubmit(ticket.id)}
                >
                  Confirmar
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={() => modal.hide()}
              >
                Cancelar
              </button>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
});
