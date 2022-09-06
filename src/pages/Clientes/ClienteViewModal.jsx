import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Formik } from 'formik';
import Select from 'react-select';
import Switch from '../../components/Switch';
import validationCliente from './Schema';
import ClientesServices from '../../services/ClientesServices';
import Loading from '../../components/Loading';

export default NiceModal.create(({ cliente }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (cliente) {
      setData({
        ...cliente,
        nit: cliente.nit || '',
        razonSocial: cliente.razonSocial || ''
      });
    }
  }, [cliente]);

  const tipos = useMemo(
    () => [
      { label: 'PERSONA JURIDICA', value: 'PERSONA JURIDICA' },
      { label: 'PERSONA NATURAL', value: 'PERSONA NATURAL' }
    ],
    []
  );

  const handleSubmit = useCallback(
    async (values) => {
      const newCliente = { ...values };
      try {
        setLoading(true);
        let resp = null;
        if (!cliente) {
          resp = await ClientesServices.post(newCliente);
        } else {
          resp = await ClientesServices.update(newCliente);
        }
        if (resp && resp.status !== 200) throw new Error();
        const item = { ...resp.data };
        modal.resolve(item);
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde'
        });
      } finally {
        setLoading(false);
      }
    },
    [modal, cliente]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalle del Cliente</ModalHeader>
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

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 my-2">
                <h3 className="border-b-2 pb-2 font-bold border-gray-500">
                  TIPO DE PERSONA
                </h3>
              </div>
              <div className="w-full md:w-1/3 px-3 my-4">
                <div className="relative">
                  <h2>{cliente.tipo}</h2>
                </div>
              </div>
            </div>

            <>
              {cliente.tipo === 'PERSONA JURIDICA' && (
                <>
                  <div className="w-full my-4">
                    <h3 className="border-b-2 pb-2 font-bold border-gray-500">
                      DATOS DE LA EMPRESA
                    </h3>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-nit"
                      >
                        Nit
                      </label>
                      <h2>{cliente.nit}</h2>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-Business"
                      >
                        Razón Social
                      </label>
                      <h2>{cliente.razonSocial}</h2>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-Business"
                      >
                        ¿ Responsable de IVA ?
                      </label>
                      <h2>{cliente.iva === 0 ? 'NO' : 'SI'}</h2>
                    </div>
                  </div>
                </>
              )}
              <div className="w-full my-4">
                <h3 className="border-b-2 pb-2  font-bold border-gray-500">
                  {cliente.tipo === 'PERSONA NATURAL'
                    ? 'DATOS PERSONALES'
                    : 'REPRESENTANTE LEGAL'}
                </h3>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-name"
                  >
                    Nombres
                  </label>
                  <h2>{cliente.nombres}</h2>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-id"
                  >
                    Cédula
                  </label>
                  <h2>{cliente.cedula}</h2>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-adress"
                  >
                    Dirección
                  </label>
                  <h2>{cliente.direccion}</h2>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <h2>{cliente.email}</h2>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-phone"
                  >
                    Telefono
                  </label>
                  <h2>{cliente.telefono}</h2>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={() => modal.remove()}
                >
                  Salir
                </button>
              </div>
            </>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
});
