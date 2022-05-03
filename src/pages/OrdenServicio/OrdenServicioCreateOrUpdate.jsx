import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text
} from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import { useModal } from '@ebay/nice-modal-react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/ BreadCrumbs';
import LiteralesServices from '../../services/LiteralesServices';
import MaquinaCreateOrUpdateModal from '../Maquinas/MaquinaCreateOrUpdateModal';
import Table from '../../components/Table';
import AccesoriosModal from './AccesoriosModal';
import ClienteCreateOrUpdateModal from '../Clientes/ClienteCreateOrUpdateModal';
import AccesorioCreateOrUpdate from '../Accesorios/AccesorioCreateOrUpdate';
import ButtonDelete from '../../components/ButtonDelete';
import { initialData, validationOrdenServicio } from './Schema';
import OrdenServicioServices from '../../services/OrdenServicioServices';
import Loading from '../../components/Loading';

function OrdenServicioCreateOrUpdate() {
  const formikRef = useRef();
  const { orden } = useParams();
  const navigate = useNavigate();
  const modalMaquina = useModal(MaquinaCreateOrUpdateModal);
  const modalAddAccesorio = useModal(AccesoriosModal);
  const modalNewAccesorio = useModal(AccesorioCreateOrUpdate);
  const modalCliente = useModal(ClienteCreateOrUpdateModal);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Ordenes de Servicio', url: '/servicios/orden-servicio' },
      { title: 'Nueva Orden', url: '/servicios/orden-servicio/new' }
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        if (orden) {
          setLoading(true);
          const resp = await OrdenServicioServices.find(orden);
          setData({
            ...resp.data,
            valorVuelta: resp.data.valorVuelta || 0,
            edit: true,
            tieneAccesorio: resp.data.accesorios.length > 0,
            accesorios: resp.data.accesorios.map((item) => ({
              accesorio: { ...item },
              valor: item.pivot.valorXhora
            }))
          });
        }
      } catch (err) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, por favor intentelos más tarde.'
        });
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [orden]);

  const handelNewCliente = useCallback(() => {
    modalCliente.show().then((newCliente) => {
      if (formikRef.current !== null) {
        formikRef.current.setFieldValue('cliente', newCliente);
      }
      setClientes((state) => [...state, newCliente]);
    });
  }, [modalCliente]);

  const handleNewMaquina = useCallback(() => {
    modalMaquina.show().then((newMaquina) => {
      if (formikRef.current !== null) {
        formikRef.current.setFieldValue('maquina', newMaquina);
        formikRef.current.setFieldValue(
          'horometroInicial',
          newMaquina.horometro
        );
      }
      setMaquinas((state) => [...state, newMaquina]);
    });
  }, [modalMaquina]);

  const handleNewAccesorio = useCallback(() => {
    modalNewAccesorio.show({ maquinas }).then((newAccesorio) => {
      if (
        formikRef.current !== null &&
        formikRef.current.values.maquina.id === newAccesorio.maquina.id
      ) {
        const arr = formikRef.current.values.maquina.accesorios
          ? formikRef.current.values.maquina.accesorios
          : [];
        formikRef.current.setFieldValue('maquina', {
          ...formikRef.current.values.maquina,
          accesorios: [...arr, newAccesorio]
        });
      }
      setMaquinas((state) =>
        state.map((item) => {
          const arr = item.accesorios ? item.accesorios : [];
          if (item.id === newAccesorio.maquina.id) {
            return { ...item, accesorios: [...arr, newAccesorio] };
          }
          return item;
        })
      );
    });
  }, [modalNewAccesorio, maquinas]);

  const handleAddAccesorio = useCallback(
    (list) => {
      modalAddAccesorio.show({ accesorios: list }).then((item) => {
        setInfo(null);
        if (formikRef.current) {
          const acc = formikRef.current.values.accesorios;
          const i = acc.findIndex((m) => m.accesorio.id === item.accesorio.id);
          const arr = [...acc];
          if (i !== -1) {
            const updated = { ...acc[i], ...item };
            arr.splice(i, 1, updated);
          } else {
            arr.push(item);
          }
          formikRef.current.setFieldValue('accesorios', arr);
        }
      });
    },
    [modalAddAccesorio]
  );

  const handelSubmit = useCallback(async (values) => {
    try {
      setLoading(true);
      const arr = values.accesorios.map((item) => ({
        id: item.accesorio.id,
        valor: item.valor
      }));
      const request = {
        ...values,
        maquina: values.maquina.id,
        cliente: values.cliente.id,
        accesorios: arr
      };
      let resp = null;
      if (!values.edit) {
        resp = await OrdenServicioServices.post(request);
      } else {
        resp = await OrdenServicioServices.update(request);
      }
      if (resp.status !== 200) {
        setInfo({ type: 'error', message: resp.message });
        return;
      }
      setInfo({
        type: 'success',
        message: resp.message
      });
      if (values.edit) navigate('/servicios/orden-servicio');
    } catch (err) {
      setInfo({
        type: 'error',
        message: 'Se ha producido un error, por favor intentelo más tarde'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetch() {
      try {
        const respClientes = await LiteralesServices.get({ model: 'clientes' });
        if (respClientes.status === 200) setClientes(respClientes.data);
        const respMaquinas = await LiteralesServices.get({ model: 'maquinas' });
        if (respMaquinas.status === 200) setMaquinas(respMaquinas.data);
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, por favor intentelo más tarde'
        });
      }
    }

    fetch();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <BreadCrumbs items={breadCrumbs} />
      <Formik
        innerRef={formikRef}
        initialValues={data || initialData}
        enableReinitialize
        validationSchema={validationOrdenServicio}
        onSubmit={(values) => handelSubmit(values)}
      >
        {(formik) => (
          <form className="rounded">
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
            <Box display="flex" alignItems="center" borderRadius="md">
              <div className="w-1/3">
                <Box display="flex" alignItems="end">
                  <Box flexGrow={1}>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-registry"
                    >
                      Cliente
                    </label>
                    <Select
                      className={`${
                        formik.errors.cliente &&
                        formik.touched.cliente &&
                        'border border-red-500 rounded'
                      }`}
                      id="cliente"
                      options={clientes}
                      getOptionLabel={(cliente) => cliente && cliente.nombres}
                      getOptionValue={(cliente) => cliente && cliente.id}
                      value={clientes.filter(
                        (cliente) => cliente.id === formik.values.cliente.id
                      )}
                      onChange={(cliente) => {
                        formik.setFieldValue('cliente', cliente);
                      }}
                    />
                  </Box>
                  <Button
                    backgroundColor="white"
                    marginLeft={2}
                    onClick={() => {
                      handelNewCliente();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Button>
                </Box>
              </div>
              <div className="w-1/3 mx-4">
                <Box display="flex" alignItems="end">
                  <Box flexGrow={1}>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-registry"
                    >
                      Maquina
                    </label>
                    {maquinas && (
                      <Select
                        className={`${
                          formik.errors.maquina &&
                          formik.touched.maquina &&
                          'border border-red-500 rounded'
                        }`}
                        id="maquina"
                        options={maquinas}
                        getOptionLabel={(maquina) => maquina && maquina.nombre}
                        getOptionValue={(maquina) => maquina && maquina.id}
                        value={maquinas.filter(
                          (maquina) => maquina.id === formik.values.maquina?.id
                        )}
                        onChange={(maquina) => {
                          formik.setFieldValue('maquina', maquina);
                          formik.setFieldValue(
                            'horometroInicial',
                            maquina.horometro
                          );
                        }}
                      />
                    )}
                  </Box>
                  <Button
                    backgroundColor="white"
                    marginLeft={2}
                    onClick={() => handleNewMaquina()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Button>
                </Box>
              </div>
              <div className="w-1/3">
                <FormControl display="flex" alignItems="end">
                  <FormLabel htmlFor="email-alerts" mb="0">
                    Tiene Accesorios adicionales ?
                  </FormLabel>
                  <Switch
                    id="email-alerts"
                    isChecked={formik.values.tieneAccesorio || false}
                    onChange={(event) => {
                      formik.setFieldValue(
                        'tieneAccesorio',
                        event.target.checked
                      );
                    }}
                  />
                </FormControl>
              </div>
            </Box>
            {formik.values.tieneAccesorio && (
              <Box overflowY="auto" height="30vh">
                <Box
                  borderBottom="1px dashed gray"
                  width="100%"
                  display="flex"
                  marginTop={2}
                  marginBottom={2}
                >
                  <Text flexGrow={1} fontWeight="400" paddingY={2}>
                    Accesorios
                  </Text>
                  <Button
                    backgroundColor="green.100"
                    marginBottom={2}
                    marginRight={2}
                    onClick={() => {
                      handleNewAccesorio();
                    }}
                  >
                    Crear Accesorio
                  </Button>
                  <Button
                    backgroundColor="green.100"
                    marginBottom={2}
                    marginRight={2}
                    onClick={() => {
                      handleAddAccesorio(formik.values.maquina?.accesorios);
                    }}
                  >
                    Agregar
                  </Button>
                </Box>
                <Table columns={['Accesorio', 'Valor X Hora', 'Acciones']}>
                  {formik.values.accesorios.length > 0 &&
                    formik.values.accesorios.map((item) => (
                      <tr key={item.accesorio.id}>
                        <td>{item.accesorio.nombre}</td>
                        <td>
                          $ {new Intl.NumberFormat('es-CO').format(item.valor)}
                        </td>
                        <td>
                          <ButtonDelete
                            onClick={() => {
                              const arr = formik.values.accesorios.filter(
                                (acc) => acc.accesorio.id !== item.accesorio.id
                              );
                              formik.setFieldValue('accesorios', arr);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </Table>
              </Box>
            )}
            <Box
              display="flex"
              alignItems="center"
              borderRadius="md"
              marginY={4}
            >
              <div className="w-1/4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-registry"
                >
                  Horometro Inicial
                </label>
                <Input
                  name="horometroInicial"
                  isInvalid={
                    formik.errors.horometroInicial &&
                    formik.touched.horometroInicial
                  }
                  errorBorderColor="red.300"
                  type="number"
                  placeholder="Horometro"
                  value={formik.values.horometroInicial}
                  disabled
                />
              </div>
              <div className="w-1/4 mx-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-registry"
                >
                  Horas Promedio
                </label>
                <Input
                  isInvalid={
                    formik.errors.horasPromedio && formik.touched.horasPromedio
                  }
                  errorBorderColor="red.300"
                  value={formik.values.horasPromedio}
                  name="horasPromedio"
                  type="text"
                  placeholder="Horas Promedio"
                  onChange={formik.handleChange}
                />
              </div>
              {!formik.values.tieneAccesorio && (
                <div className="w-1/4">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-registry"
                  >
                    Valor X Hora
                  </label>
                  <Input
                    isInvalid={
                      formik.errors.valorXhora && formik.touched.valorXhora
                    }
                    value={formik.values.valorXhora}
                    type="input"
                    name="valorXhora"
                    placeholder="$ valor"
                    onChange={formik.handleChange}
                  />
                </div>
              )}
              <div className="w-1/4 ml-2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-registry"
                >
                  Pagare
                </label>
                <Input
                  isInvalid={formik.errors.pagare && formik.touched.pagare}
                  type="file"
                  name="pagare"
                  placeholder="pagare"
                  onChange={(event) => {
                    formik.setFieldValue('pagare', event.target.files[0]);
                  }}
                />
              </div>
            </Box>
            <Box display="flex" flexWrap="wrap" alignItems="center">
              <Box
                borderBottom="1px dashed gray"
                width="100%"
                marginTop={2}
                marginBottom={2}
              >
                <Text fontWeight="400" paddingY={2}>
                  Valor del transporte
                </Text>
              </Box>
              <Box width="30%">
                <FormControl>
                  <FormLabel htmlFor="">Valor de Ida</FormLabel>
                  <Input
                    isInvalid={
                      formik.errors.valorIda && formik.touched.valorIda
                    }
                    errorBorderColor="red.300"
                    placeholder="$ valor"
                    type="text"
                    value={formik.values.valorIda}
                    onChange={(event) => {
                      formik.setFieldValue('valorIda', event.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              {formik.values.horasPromedio < 100 && (
                <Box width="30%" paddingLeft={2}>
                  <FormControl>
                    <FormLabel htmlFor="">Vuelta</FormLabel>
                    <Input
                      name="valorVuelta"
                      isInvalid={
                        formik.errors.valorVuelta && formik.touched.valorVuelta
                      }
                      value={formik.values.valorVuelta}
                      errorBorderColor="red.300"
                      placeholder="$ valor"
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="end">
              <button
                type="button"
                className="btn btn-success"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(formik.errors);
                  if (formik.errors.accesorios) {
                    setInfo({
                      type: 'error',
                      message: formik.errors.accesorios
                    });
                  }
                  formik.handleSubmit();
                }}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={() => {
                  navigate('/servicios/orden-servicio');
                }}
              >
                Cancelar
              </button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default OrdenServicioCreateOrUpdate;
