import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Formik } from 'formik';
import Select from 'react-select';
import validationMaquina from './Schema';
import Loading from '../../components/Loading';
import MaquinaServices from '../../services/MaquinasServices';
import LiteralesServices from '../../services/LiteralesServices';

export default NiceModal.create(({ maquina }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    if (maquina) {
      setData({
        ...maquina,
        marca: maquina.marca.id,
        placa: maquina.placa || ''
      });
    }
  }, [maquina]);

  const tipos = useMemo(
    () => [
      { label: 'MÁQUINA', value: 'MAQUINA' },
      { label: 'VEHICULO', value: 'VEHICULO' }
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respMarcas = await LiteralesServices.get({ model: 'marcas' });
        if (respMarcas.status === 200) {
          setMarcas(respMarcas.data);
        }
      } catch (error) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      const newMaquina = { ...values };
      try {
        setLoading(true);
        let resp = null;
        if (!maquina) {
          resp = await MaquinaServices.post(newMaquina);
        } else {
          resp = await MaquinaServices.update(newMaquina);
        }
        if (resp.status !== 200) throw new Error();
        const marca = marcas.find((item) => item.id === values.marca);
        const item = { ...resp.data, marca };
        modal.resolve(item);
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    },
    [modal, maquina, marcas]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {maquina ? 'Actualizar Maquina' : 'Crear Maquina'}
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
            <Formik
              initialValues={
                data || {
                  tipo: '',
                  nombre: '',
                  marca: '',
                  modelo: '',
                  serie: '',
                  linea: '',
                  registro: '',
                  placa: ''
                }
              }
              enableReinitialize
              validationSchema={validationMaquina}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 my-2">
                      <h3 className="border-b-2 pb-2 border-dotted border-gray-500">
                        TIPO
                      </h3>
                    </div>
                    <div className="w-full md:w-1/3 px-3 my-4">
                      <div className="relative">
                        <Select
                          options={tipos}
                          textField="label"
                          valueField="value"
                          value={tipos.filter(
                            (tipo) => tipo.value === formik.values.tipo
                          )}
                          onChange={(type) => {
                            formik.setFieldValue('tipo', type.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {formik.values.tipo !== '' && (
                    <>
                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-name"
                          >
                            Nombre
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.nombre && formik.touched.nombre
                                ? 'border border-red-500'
                                : ''
                            }`}
                            id="grid-name"
                            type="text"
                            name="nombre"
                            value={formik.values.nombre}
                            placeholder="name"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-marca"
                          >
                            Marca
                          </label>
                          <div className="relative">
                            <Select
                              className="border-red-400"
                              options={marcas}
                              getOptionLabel={(marca) => marca && marca.nombre}
                              getOptionValue={(marca) => marca && marca.id}
                              value={marcas.filter(
                                (marca) => marca.id === formik.values.marca
                              )}
                              onChange={(marca) => {
                                formik.setFieldValue('marca', marca.id);
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-model"
                          >
                            Modelo
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.modelo && formik.touched.modelo
                                ? 'border border-red-500'
                                : ''
                            }`}
                            id="grid-model"
                            type="number"
                            name="modelo"
                            value={formik.values.modelo}
                            placeholder="model"
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-2">
                        <div
                          className={`"w-full  ${
                            formik.values.tipo === 'MAQUINA'
                              ? 'md:w-1/3'
                              : 'md:w-1/4'
                          }  px-3 mb-6 md:mb-0"`}
                        >
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-serie"
                          >
                            Serie
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.serie && formik.touched.serie
                                ? 'border border-red-500'
                                : ''
                            }`}
                            id="grid-serie"
                            type="text"
                            name="serie"
                            value={formik.values.serie}
                            placeholder="serie"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div
                          className={`"w-full  ${
                            formik.values.tipo === 'MAQUINA'
                              ? 'md:w-1/3'
                              : 'md:w-1/4'
                          }  px-3 mb-6 md:mb-0"`}
                        >
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-line"
                          >
                            Linea
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.linea && formik.touched.linea
                                ? 'border border-red-500'
                                : ''
                            }`}
                            id="grid-line"
                            type="text"
                            name="linea"
                            value={formik.values.linea}
                            placeholder="line"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div
                          className={`"w-full  ${
                            formik.values.tipo === 'MAQUINA'
                              ? 'md:w-1/3'
                              : 'md:w-1/4'
                          }  px-3 mb-6 md:mb-0"`}
                        >
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-registry"
                          >
                            Número de Registro
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.registro && formik.touched.registro
                                ? 'border border-red-500'
                                : ''
                            }`}
                            id="grid-regitry"
                            type="text"
                            name="registro"
                            value={formik.values.registro}
                            placeholder="registry"
                            onChange={formik.handleChange}
                          />
                        </div>
                        {formik.values.tipo === 'VEHICULO' && (
                          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-plate"
                            >
                              Placa
                            </label>
                            <input
                              className={`input-box ${
                                formik.errors.placa && formik.touched.placa
                                  ? 'border border-red-500'
                                  : ''
                              }`}
                              id="grid-plate"
                              type="text"
                              name="placa"
                              value={formik.values.placa}
                              onChange={formik.handleChange}
                              placeholder="plate"
                            />
                          </div>
                        )}
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
                    </>
                  )}
                </form>
              )}
            </Formik>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
});
