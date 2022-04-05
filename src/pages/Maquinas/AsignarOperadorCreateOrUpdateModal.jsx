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
import Loading from '../../components/Loading';
import LiteralesServices from '../../services/LiteralesServices';
import validationAsignacion from './SchemaII';
import MaquinaServices from '../../services/MaquinasServices';

export default NiceModal.create(() => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [maquinas, setMaquinas] = useState([]);
  const [operadores, setOperadores] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const respMaquinas = await LiteralesServices.get({ model: 'maquinas' });
        if (respMaquinas.status === 200) {
          setMaquinas(respMaquinas.data);
        }
        const respOperadores = await LiteralesServices.get({
          model: 'operadores'
        });
        if (respOperadores.status === 200) {
          setOperadores(respOperadores.data);
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

  const handleSubmit = useCallback(async (values) => {
    try {
      setLoading(true);
      const resp = await MaquinaServices.asignar(values);
      if (resp.status !== 200) throw new Error();
      setInfo({
        type: 'success',
        message: resp.message
      });
      modal.resolve(resp.data);
      modal.remove();
    } catch (err) {
      setInfo({
        type: 'error',
        message: 'Se ha producido un error, por favor intentelo más tarde'
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar Operador</ModalHeader>
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
              initialValues={{
                maquina: '',
                operador: ''
              }}
              enableReinitialize
              validationSchema={validationAsignacion}
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
                        Máquina
                      </label>

                      <div className="relative">
                        <Select
                          className={`${
                            formik.errors.maquina &&
                            formik.touched.maquina &&
                            'border border-red-500 rounded'
                          }`}
                          id="maquina"
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
                    <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-operador"
                      >
                        Operador
                      </label>

                      <div className="relative">
                        <Select
                          className={`${
                            formik.errors.operador &&
                            formik.touched.operador &&
                            'border border-red-500 rounded'
                          }`}
                          options={operadores}
                          getOptionLabel={(operador) =>
                            operador &&
                            `${operador.nombres} ${operador.apellidos}`
                          }
                          getOptionValue={(operador) => operador && operador.id}
                          value={operadores.filter(
                            (operador) => operador.id === formik.values.operador
                          )}
                          onChange={(operador) => {
                            formik.setFieldValue('operador', operador.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="btn btn-success">
                      Asignar
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
