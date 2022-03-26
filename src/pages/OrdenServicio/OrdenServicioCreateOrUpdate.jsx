import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertIcon,
  AlertDescription,
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
import validationOrdenServicio from './Schema';
import OrdenServicioServices from '../../services/OrdenServicioServices';
import Loading from '../../components/Loading';
import ClientesServices from '../../services/ClientesServices';
import MaquinasServices from '../../services/MaquinasServices';

export default NiceModal.create(({ ordenServicio }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    if (ordenServicio) {
      setData({
        ...ordenServicio,
        cliente: ordenServicio.cliente.id,
        maquina: ordenServicio.maquina.id,
        descuento: ordenServicio.descuento || '',
        valorVuelta: ordenServicio.valorVuelta || ''
      });
    }
  }, [ordenServicio]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respClientes = await ClientesServices.all();
        if (respClientes.status === 200) {
          setClientes(respClientes.data);
        }
        const respMaquinas = await MaquinasServices.all();
        if (respMaquinas === 200) {
          setMaquinas(respMaquinas.data);
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
      const newOrdenServicio = { ...values };
      try {
        setLoading(true);
        if (!ordenServicio) {
          await OrdenServicioServices.post(newOrdenServicio);
        } else {
          await OrdenServicioServices.update(newOrdenServicio);
        }
        const cliente = clientes.find((item) => item.id === values.cliente);
        const maquina = maquinas.find((item) => item.id === values.maquina);
        modal.resolve({ ...newOrdenServicio, cliente, maquina });
        await modal.remove();
      } catch (e) {
        setInfo({
          typa: 'error',
          messag: 'se ha producido un error, por favor intentalo más tarde'
        });
      } finally {
        setLoading(false);
      }
    },
    [modal, ordenServicio, clientes, maquinas]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.hide()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {ordenServicio
            ? 'Actualizar Orden de Servicio'
            : 'Crear Orden De Servicio'}
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
                  <Box>
                    <AlertDescription display="block">
                      {info.message}
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    position="absolute"
                    rigth="8px"
                    top="8px"
                    onClick={() => setInfo(null)}
                  />
                </Alert>
              </div>
            )}
            <Formik
              initialValues={
                data || {
                  id: '',
                  cliente: '',
                  maquina: '',
                  horometroInicial: '',
                  horasPromedio: '',
                  valorXhora: '',
                  descuento: '',
                  valorIda: '',
                  valorVuelta: '',
                  pagare: ''
                }
              }
              enableReinitialize
              validationSchema={validationOrdenServicio}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-cliente"
                      >
                        cliente
                      </label>
                      <div className="relative">
                        <Select
                          className="border-red-400"
                          options={clientes}
                          getOptionLabel={(cliente) =>
                            cliente && cliente.nombre
                          }
                          getOptionValue={(cliente) => cliente && cliente.id}
                          value={clientes.filter(
                            (cliente) => cliente.id === formik.values.cliente
                          )}
                          onChange={(cliente) => {
                            formik.setFieldValue('cliente', cliente.id);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-maquina"
                      >
                        Maquina
                      </label>
                      <div className="relative">
                        <Select
                          className="border-red-400"
                          options={maquinas}
                          getOptionLabel={(maquina) =>
                            maquina && maquina.nombre
                          }
                          getOptionValue={(maquina) => maquina && maquina.id}
                          value={maquinas.filter(
                            (maquina) => maquina.id === formik.values.maquina
                          )}
                          onChange={(maquina) => {
                            formik.setFieldValue('maquina', maquina.id);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-name"
                      >
                        Nombre
                      </label>
                      <input
                        className={`input-box ${
                          formik.errors.nombre ? 'border border-red-500' : ''
                        }`}
                        id="grid-name"
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        placeholder="name"
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
                      onClick={() => modal.hide()}
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
