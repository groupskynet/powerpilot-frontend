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
  Input
} from '@chakra-ui/react';
import Select from 'react-select';
import { Formik } from 'formik';
import { useModal } from '@ebay/nice-modal-react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/ BreadCrumbs';
import LiteralesServices from '../../services/LiteralesServices';
import ProveedorCreateOrUpdateModal from '../Proveedores/ProveedorCreateOrUpdateModal';
import { initialData, validationMantenimiento } from './Schema';
import Loading from '../../components/Loading';
import MantenimientosServices from '../../services/MantenimientosServices';

function MantenimientoCreateOrUpdate() {
  const formikRef = useRef();
  const { mantenimiento } = useParams();
  const navigate = useNavigate();
  const modalProveedor = useModal(ProveedorCreateOrUpdateModal);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Mantenimientos', url: '/movimientos/mantenimientos' },
      { title: 'Nuevo Mantenimiento', url: '/movimientos/mantenimiento/new' }
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        if (mantenimiento) {
          setLoading(true);
          const resp = await MantenimientosServices.find(mantenimiento);
          setData({
            ...resp.data,
            edit: true
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
  }, [mantenimiento]);

  const handelNewProveedor = useCallback(() => {
    modalProveedor.show().then((newProveedor) => {
      if (formikRef.current !== null) {
        formikRef.current.setFieldValue('proveedor', newProveedor);
      }
      setProveedores((state) => [...state, newProveedor]);
    });
  }, [modalProveedor]);

  const tipos = useMemo(() => [
    { label: 'PREVENTIVO', value: 'PREVENTIVO' },
    { label: 'CORRECTIVO', value: 'CORRECTIVO' }
  ]);

  const modalidades = useMemo(() => [
    { label: 'CREDITO', value: 'CREDITO' },
    { label: 'PAGO PARCIAL', value: 'PAGO PARCIAL' },
    { label: 'EFECTIVO', value: 'EFECTIVO' }
  ]);

  const handelSubmit = useCallback(
    async (values) => {
      try {
        setLoading(true);

        const request = {
          ...values,
          maquina: values.maquina.id,
          proveedor: values.proveedor.id
        };
        let resp = null;
        if (!values.edit) {
          resp = await MantenimientosServices.post(request);
        } else {
          resp = await MantenimientosServices.update(request);
        }
        if (resp.status !== 200) throw new Error();
        setInfo({
          type: 'success',
          message: resp.message
        });
        if (values.edit) navigate('/movimientos/mantenimientos');
      } catch (err) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, por favor intentelo más tarde'
        });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respProveedores = await LiteralesServices.get({
          model: 'proveedores'
        });
        if (respProveedores.status === 200)
          setProveedores(respProveedores.data);
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
        validationSchema={validationMantenimiento}
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
            <Box
              display="flex"
              alignItems="center"
              borderRadius="md"
              marginY={4}
            >
              <div className="w-1/3">
                <Box display="flex" alignItems="end">
                  <Box flexGrow={1}>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-tipo"
                    >
                      TIPO DE MANTENIMIENTO
                    </label>
                    <Select
                      className={`${
                        formik.errors.tipo &&
                        formik.touched.tipo &&
                        'border border-red-500 rounded'
                      }`}
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
                  </Box>
                </Box>
              </div>
            </Box>
            {formik.values.tipo !== '' && (
              <>
                <Box display="flex" alignItems="center" borderRadius="md">
                  <div className="w-1/3 ">
                    <Box display="flex" alignItems="end">
                      <Box flexGrow={1}>
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-maquina"
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
                            getOptionLabel={(maquina) =>
                              maquina && maquina.nombre
                            }
                            getOptionValue={(maquina) => maquina && maquina.id}
                            value={maquinas.filter(
                              (maquina) =>
                                maquina.id === formik.values.maquina?.id
                            )}
                            onChange={(maquina) => {
                              formik.setFieldValue('maquina', maquina);
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </div>
                  <div className="w-1/3 mx-4">
                    <Box display="flex" alignItems="end">
                      <Box flexGrow={1}>
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-proveedor"
                        >
                          Proveedor
                        </label>
                        <Select
                          className={`${
                            formik.errors.proveedor &&
                            formik.touched.proveedor &&
                            'border border-red-500 rounded'
                          }`}
                          id="proveedor"
                          options={proveedores}
                          getOptionLabel={(proveedor) =>
                            proveedor && proveedor.nombres
                          }
                          getOptionValue={(proveedor) =>
                            proveedor && proveedor.id
                          }
                          value={proveedores.filter(
                            (proveedor) =>
                              proveedor.id === formik.values.proveedor?.id
                          )}
                          onChange={(proveedor) => {
                            formik.setFieldValue('proveedor', proveedor);
                          }}
                        />
                      </Box>
                      <Button
                        backgroundColor="white"
                        marginLeft={2}
                        onClick={() => {
                          handelNewProveedor();
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
                  <div className="w-1/4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-horometro"
                    >
                      Horometro
                    </label>
                    <Input
                      name="horometro"
                      isInvalid={
                        formik.errors.horometro && formik.touched.horometro
                      }
                      errorBorderColor="red.300"
                      type="number"
                      placeholder="Horometro"
                      value={formik.values.horometro}
                      onChange={formik.handleChange}
                    />
                  </div>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  borderRadius="md"
                  marginY={4}
                >
                  <div className="w-1/4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-modalidad"
                    >
                      MODALIDAD DE PAGO
                    </label>

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
                  <div className="w-1/4 ml-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-costo"
                    >
                      Costo
                    </label>
                    <Input
                      isInvalid={formik.errors.costo && formik.touched.costo}
                      value={formik.values.costo}
                      type="input"
                      name="costo"
                      placeholder="$ costo"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.values.modalidad === 'PAGO PARCIAL' && (
                    <div className="w-1/4 ml-4">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-abono"
                      >
                        Abono
                      </label>
                      <Input
                        isInvalid={formik.errors.abono && formik.touched.abono}
                        value={formik.values.abono}
                        type="input"
                        name="abono"
                        placeholder="$ abono"
                        onChange={formik.handleChange}
                      />
                    </div>
                  )}
                  <div className="w-1/4 ml-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-soporte"
                    >
                      Soporte
                    </label>
                    <Input
                      isInvalid={
                        formik.errors.soporte && formik.touched.soporte
                      }
                      type="file"
                      name="soporte"
                      placeholder="soporte"
                      onChange={(event) => {
                        formik.setFieldValue('soporte', event.target.files[0]);
                      }}
                    />
                  </div>
                </Box>
                <Box>
                  <div className="w-full md:w-2/4 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-descripcion"
                    >
                      Descripción
                    </label>
                    <textarea
                      className={`block w-full px-3 py-1 text-base font-normal text-gray-700 bg-gray-100 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                        formik.errors.descripcion && formik.touched.descripcion
                          ? 'border border-red-500'
                          : ''
                      }`}
                      id="textarea-descripcion"
                      rows="4"
                      name="descripcion"
                      value={formik.values.descripcion}
                      placeholder="ingrese descripcion "
                      onChange={formik.handleChange}
                    />
                  </div>
                </Box>
                <Box display="flex" justifyContent="end">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => formik.handleSubmit()}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      navigate('/movimientos/mantenimiento');
                    }}
                  >
                    Cancelar
                  </button>
                </Box>
              </>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default MantenimientoCreateOrUpdate;
