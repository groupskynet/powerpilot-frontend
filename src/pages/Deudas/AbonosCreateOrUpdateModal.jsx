import React, { useCallback, useEffect, useState } from 'react';
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
import validationAbonos from './Schema';
import Loading from '../../components/Loading';
import LiteralesServices from '../../services/LiteralesServices';
import AbonosServices from '../../services/AbonosServices';

export default NiceModal.create(({ abono }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    if (abono) {
      setData({
        ...abono,
        proveedor: abono.proveedor.id
      });
    }
  }, [abono]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respProveedores = await LiteralesServices.get({
          model: 'proveedores'
        });
        if (respProveedores.status === 200) {
          setProveedores(respProveedores.data);
        }
      } catch (error) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde'
        });
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      const newAbono = { ...values };
      try {
        setLoading(true);
        if (!abono) {
          await AbonosServices.post(newAbono);
        } else {
          await AbonosServices.update(newAbono);
        }
        const proveedor = proveedores.find(
          (item) => item.id === values.proveedor
        );
        modal.resolve({ ...newAbono, proveedor });
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde'
        });
      }
    },
    [modal, abono, proveedores]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{abono ? 'Actualizar Abono' : 'Nuevo Abono'}</ModalHeader>
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
            <Formik
              initialValues={
                data || {
                  proveedor: '',
                  valor: ''
                }
              }
              enableReinitialize
              validationSchema={validationAbonos}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-maquina"
                      >
                        Proveedor
                      </label>

                      <div className="relative">
                        <Select
                          className="border-red-400"
                          options={proveedores}
                          getOptionLabel={(proveedor) =>
                            proveedor && proveedor.nombres
                          }
                          getOptionValue={(proveedor) =>
                            proveedor && proveedor.id
                          }
                          value={proveedores.filter(
                            (proveedor) =>
                              proveedor.id === formik.values.proveedor
                          )}
                          onChange={(proveedor) => {
                            formik.setFieldValue('proveedor', proveedor.id);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-cost"
                      >
                        Valor
                      </label>
                      <input
                        className={`input-box ${
                          formik.errors.valor && formik.touched.valor
                            ? 'border border-red-500'
                            : ''
                        }`}
                        id="grid-valor"
                        type="number"
                        name="valor"
                        value={formik.values.valor}
                        placeholder="valor"
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={() => modal.remove()}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
});
