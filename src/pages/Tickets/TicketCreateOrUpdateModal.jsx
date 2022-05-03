import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Select from 'react-select';
import Loading from '../../components/Loading';
import TicketsServices from '../../services/TicketsServices';
import LiteralesServices from '../../services/LiteralesServices';
import { initialData, validationTicket } from './Schema';
import OrdenServicioServices from '../../services/OrdenServicioServices';

export default NiceModal.create(() => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [operadores, setOperadores] = useState([]);
  const [info, setInfo] = useState(null);

  const getOrdenDeServicio = useCallback(async (id) => {
    try {
      setLoading(true);
      const resp = await OrdenServicioServices.buscarOrdenDeServicioActiva(id);
      if (resp.status === 200) {
        setInfo(null);
        setData({
          ...initialData,
          horometroInicial: resp.data.horometro,
          horometroFinal: resp.data.horometro,
          operador: id,
          nOrden: resp.data.id,
          numero_orden: resp.data.numero_orden,
          cliente: resp.data.cliente,
          maquina: resp.data.maquina,
          accesorios: resp.data.accesorios
        });
      } else {
        setInfo({ type: 'error', message: resp.message });
      }
    } catch (e) {
      setData({ ...initialData });
      setInfo({
        type: 'error',
        message: 'Se ha producido un error, por favor intentarlo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const resp = await LiteralesServices.get({ model: 'operadores' });
        if (resp.status === 200) setOperadores(resp.data);
      } catch (error) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, por favor intentelo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      const newTicket = {
        ...values,
        cliente: values.cliente.id,
        maquina: values.maquina.id,
        accesorio: values.accesorio || null
      };
      try {
        setLoading(true);
        let resp = null;
        resp = await TicketsServices.post(newTicket);
        if (resp.status === 200) throw new Error('');
        modal.resolve(newTicket);
        await modal.remove();
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error,Por favor intentelo más tarde.'
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
        <ModalHeader>Crear Nuevo Ticket</ModalHeader>
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
              initialValues={data || initialData}
              enableReinitialize
              validationSchema={validationTicket}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <Flex>
                    <FormControl width="33%">
                      <FormLabel>OPERADOR</FormLabel>
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
                          getOrdenDeServicio(operador.id);
                        }}
                      />
                    </FormControl>
                    {formik.values.operador && (
                      <FormControl width="33%" pl={2}>
                        <FormLabel>FECHA</FormLabel>
                        <Input
                          isInvalid={
                            formik.errors.fecha && formik.touched.fecha
                          }
                          type="date"
                          name="fecha"
                          value={formik.values.fecha}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    )}
                    {formik.values.operador && (
                      <FormControl width="33%" pl={2}>
                        <FormLabel># ORDEN DE SERVICIO</FormLabel>
                        <Text
                          className="rounded border border-gray-200"
                          padding={2}
                        >
                          {formik.values.numero_orden}
                        </Text>
                      </FormControl>
                    )}
                  </Flex>
                  {formik.values.operador && (
                    <Box>
                      <Box display="flex" marginTop={4} alignItems="center">
                        <FormControl className="w-1/3">
                          <FormLabel>CLIENTE</FormLabel>
                          <Text
                            className="rounded border border-gray-200"
                            padding={2}
                          >
                            {formik.values.cliente &&
                              formik.values.cliente.nombres}
                          </Text>
                        </FormControl>
                        <FormControl className="w-1/3 px-2">
                          <FormLabel>MAQUINA</FormLabel>
                          <Text
                            className="rounded border border-gray-200"
                            padding={2}
                          >
                            {formik.values.maquina &&
                              formik.values.maquina.nombre}
                          </Text>
                        </FormControl>
                        {formik.values.accesorios &&
                          formik.values.accesorios.length > 0 && (
                            <FormControl className="w-1/3">
                              <FormLabel>ACCESORIOS</FormLabel>
                              <Select
                                options={formik.values.accesorios}
                                className={`${
                                  formik.errors.accesorio &&
                                  formik.touched.accesorio &&
                                  'border border-red-500 rounded'
                                }`}
                                getOptionLabel={(accesorio) =>
                                  accesorio && accesorio.nombre
                                }
                                getOptionValue={(accesorio) =>
                                  accesorio && accesorio.id
                                }
                                value={formik.values.accesorios.filter(
                                  (accesorio) =>
                                    accesorio.id === formik.values.accesorio
                                )}
                                onChange={(accesorio) => {
                                  formik.setFieldValue(
                                    'accesorio',
                                    accesorio.id
                                  );
                                }}
                              />
                            </FormControl>
                          )}
                      </Box>
                      <Flex align="end" marginTop={4}>
                        <FormControl className="w-1/4">
                          <FormLabel>HOROMETRO INICIAL</FormLabel>
                          <Text
                            className="rounded border border-gray-200"
                            padding={2}
                          >
                            {formik.values.horometroInicial}
                          </Text>
                        </FormControl>
                        <FormControl className="w-1/4 px-2">
                          <FormLabel>HOROMETRO FINAL</FormLabel>
                          <Input
                            placeholder="value"
                            isInvalid={
                              formik.errors.horometroFinal &&
                              formik.touched.horometroFinal
                            }
                            name="horometroFinal"
                            value={formik.values.horometroFinal}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                        <FormControl className="w-1/4 px-2">
                          <FormLabel>TOTAL</FormLabel>
                          <Text
                            className="rounded border border-gray-200"
                            padding={2}
                          >
                            {formik.values.horometroFinal -
                              formik.values.horometroInicial}
                          </Text>
                        </FormControl>
                        <FormControl
                          display="flex"
                          alignItems="end"
                          className="w-1/4 mb-2 justify-center"
                        >
                          <FormLabel htmlFor="email-alerts" mb="0">
                            Combustible ?
                          </FormLabel>
                          <Switch
                            id="email-alerts"
                            isChecked={formik.values.tieneCombustible || false}
                            onChange={(event) => {
                              formik.setFieldValue(
                                'tieneCombustible',
                                event.target.checked
                              );
                            }}
                          />
                        </FormControl>
                      </Flex>
                      <Box marginTop={2}>
                        <FormControl width="100%" className="">
                          <FormLabel>SOPORTE</FormLabel>
                          <Input
                            type="file"
                            name="soporte"
                            isInvalid={
                              formik.errors.soporte && formik.touched.soporte
                            }
                            accept="image/*"
                            onChange={(event) => {
                              formik.setFieldValue(
                                'soporte',
                                event.target.files[0]
                              );
                            }}
                          />
                        </FormControl>
                      </Box>
                      {formik.values.tieneCombustible && (
                        <Flex marginTop={4} flexWrap="wrap">
                          <Text
                            fontWeight="bold"
                            width="100%"
                            pb={2}
                            mb={3}
                            borderBottom="1px dashed gray"
                          >
                            COMBUSTIBLE
                          </Text>
                          <FormControl width="25%">
                            <FormLabel>CANTIDAD DE GALONES</FormLabel>
                            <Input
                              name="galones"
                              isInvalid={
                                formik.errors.galones && formik.touched.galones
                              }
                              type="number"
                              placeholder="Cantidad"
                              value={formik.values.galones}
                              onChange={formik.handleChange}
                            />
                          </FormControl>
                          <FormControl width="25%" className="ml-2">
                            <FormLabel>COSTO POR GALON</FormLabel>
                            <Input
                              name="costo"
                              type="number"
                              isInvalid={
                                formik.errors.costo && formik.touched.costo
                              }
                              placeholder="Costo"
                              value={formik.values.costo}
                              onChange={formik.handleChange}
                            />
                          </FormControl>
                        </Flex>
                      )}
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
                    </Box>
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
