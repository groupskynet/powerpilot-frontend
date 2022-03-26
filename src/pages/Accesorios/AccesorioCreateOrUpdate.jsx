import React, { useCallback, useEffect, useState } from 'react';
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
  ModalHeader,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Select from 'react-select';
import validationAccesorio from './Schema';
import MaquinasServices from '../../services/MaquinasServices';
import MarcasServices from '../../services/MarcasServices';
import AccesoriosServices from '../../services/AccesoriosServices';

export default NiceModal.create(({ accesorio }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    if (accesorio) {
      setData({
        ...accesorio,
        marca: accesorio.marca.id,
        maquina: accesorio.maquina.id
      });
    }
  }, [accesorio]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respMarcas = await MarcasServices.all();
        if (respMarcas.status === 200) {
          setMarcas(respMarcas.data);
        }
        const respMaquinas = await MaquinasServices.all();
        if (respMaquinas.status === 200) {
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
      const newAccesorio = { ...values };
      try {
        setLoading(true);
        if (!accesorio) {
          await AccesoriosServices.post(newAccesorio);
        } else {
          await AccesoriosServices.update(newAccesorio);
        }
        const marca = marcas.find((item) => item.id === values.marca);
        const maquina = maquinas.find((item) => item.id === values.maquina);
        modal.resolve({ ...newAccesorio, marca, maquina });
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
    [modal, accesorio, marcas, maquinas]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.hide()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {accesorio ? 'Actualizar Accesorio' : 'Crear Accesorio'}
        </ModalHeader>
        <ModalCloseButton />
        {loading && (
          <div className="py-4">
            <loading />
          </div>
        )}
        {!loading && (
          <ModalBody>
            {info && (
              <div className=" mb-2">
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
                  nombre: '',
                  marca: '',
                  modelo: '',
                  serie: '',
                  linea: '',
                  registro: '',
                  maquina: ''
                }
              }
              enableReinitialize
              validationSchema={validationAccesorio}
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
                        type="text"
                        name="modelo"
                        value={formik.values.modelo}
                        placeholder="model"
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                        id="grid-regitro"
                        type="text"
                        name="registro"
                        value={formik.values.registro}
                        placeholder="registry"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-maquina"
                      >
                        Máquina
                      </label>
                      <div className="relative">
                        <Select
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
