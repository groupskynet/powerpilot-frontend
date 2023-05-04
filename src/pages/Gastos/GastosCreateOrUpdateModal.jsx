import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Select from 'react-select';
import validationGastos from './Schema';
import Loading from '../../components/Loading';
import LiteralesServices from '../../services/LiteralesServices';
import GastosServices from '../../services/GastosServices';

export default NiceModal.create(({ gasto }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [maquinas, setMaquinas] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const modalidades = useMemo(
    () => [
      { label: 'CREDITO', value: 'CREDITO' },
      { label: 'PAGO PARCIAL', value: 'PAGO PARCIAL' },
      { label: 'EFECTIVO', value: 'EFECTIVO' }
    ],
    []
  );

  useEffect(() => {
    if (gasto) {
      setData({
        ...gasto,
        maquina: gasto.maquina.id
      });
    }
  }, [gasto]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respMaquinas = await LiteralesServices.get({ model: 'maquinas' });
        if (respMaquinas.status === 200) {
          setMaquinas(respMaquinas.data);
        }

        const respProveedores = await LiteralesServices.get({
          model: 'proveedores'
        });
        if (respProveedores.status == 200) {
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
      const newGasto = { ...values };
      try {
        setLoading(true);
        if (!gasto) {
          await GastosServices.post(newGasto);
        } else {
          await GastosServices.update(newGasto);
        }
        const maquina = maquinas.find((item) => item.id === values.maquina);
        modal.resolve({ ...newGasto, maquina });
        modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde'
        });
      }
    },
    [modal, gasto, maquinas]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{gasto ? 'Actualizar Gasto' : 'Nuevo Gasto'}</ModalHeader>
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
                  maquina: '',
                  proveedor: '',
                  modalidad: '',
                  valor: '',
                  abono: '',
                  descripcion: '',
                  soporte: ''
                }
              }
              enableReinitialize
              validationSchema={validationGastos}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-maquina"
                      >
                        Máquina
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
                    <div className="w-full">
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
                    <div className="w-full">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-maquina"
                      >
                        Modalidad de pago
                      </label>

                      <div className="relative">
                        <Select
                          className={`${
                            formik.errors.modalidad &&
                            formik.touched.modalidad &&
                            'border border-red-500 rounded'
                          }`}
                          options={modalidades}
                          textField="label"
                          valueField="value"
                          value={modalidades.filter(
                            (tipo) => tipo.value === formik.values.modalidad
                          )}
                          onChange={(type) => {
                            formik.setFieldValue('modalidad', type.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div >
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-cost"
                        >
                          Valor
                        </label>
                          <Input
                            isInvalid={
                              formik.errors.valor && formik.touched.valor
                            }
                            value={formik.values.valor}
                            type="input"
                            name="valor"
                            placeholder="$ valor"
                            onChange={formik.handleChange}
                          />
                      </div>
                      {formik.values.modalidad === 'PAGO PARCIAL' && (
                        <div>
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-abono"
                          >
                            Abono
                          </label>
                          <Input
                            isInvalid={
                              formik.errors.abono && formik.touched.abono
                            }
                            value={formik.values.abono}
                            type="input"
                            name="abono"
                            placeholder="$ abono"
                            onChange={formik.handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2 mt-2">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-descripcion"
                      >
                        Descripción
                      </label>
                      <textarea
                        className={`block w-full px-3 py-1 text-base font-normal text-gray-700 bg-gray-100 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                          formik.errors.descripcion &&
                          formik.touched.descripcion
                            ? 'border border-red-500'
                            : ''
                        }`}
                        id="textarea-serie"
                        rows="4"
                        name="descripcion"
                        value={formik.values.descripcion}
                        placeholder="ingrese descripcion "
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-soporte"
                      >
                        Soporte
                      </label>
                      <input
                        className={`input-box ${
                          formik.errors.soporte && formik.touched.soporte
                            ? 'border border-red-500'
                            : ''
                        }`}
                        id="grid-soporte"
                        type="file"
                        name="soporte"
                        placeholder=""
                        onChange={(event) => {
                          formik.setFieldValue(
                            'soporte',
                            event.target.files[0]
                          );
                        }}
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
