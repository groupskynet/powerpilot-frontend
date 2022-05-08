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
import ProveedoresServices from '../../services/ProveedoresServices';
import Loading from '../../components/Loading';

export default NiceModal.create(({ proveedor }) => {
  const modal = useModal();

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (proveedor) {
      setData({
        ...proveedor,
        nit: proveedor.nit || '',
        razonSocial: proveedor.razonSocial || ''
      });
    }
  }, [proveedor]);

  const tipos = useMemo(
    () => [
      { label: 'PERSONA JURIDICA', value: 'PERSONA JURIDICA' },
      { label: 'PERSONA NATURAL', value: 'PERSONA NATURAL' }
    ],
    []
  );

  const handleSubmit = useCallback(
    async (values) => {
      const newProveedor = { ...values };
      try {
        setLoading(true);
        let resp = null;
        if (!proveedor) {
          resp = await ProveedoresServices.post(newProveedor);
        } else {
          resp = await ProveedoresServices.update(newProveedor);
        }
        if (resp && resp.status !== 200) {
          setInfo({ type: 'error', message: resp.message });
        }
        modal.resolve({ ...resp.data });
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
    [modal, proveedor]
  );

  return (
    <Modal isOpen={modal.visible} size="5xl" onClose={() => modal.remove()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {proveedor ? 'Actualizar Proveedor' : 'Crear Proveedor'}
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
                  nit: '',
                  razonSocial: '',
                  iva: true,
                  nombres: '',
                  apellidos: '',
                  cedula: '',
                  direccion: '',
                  email: '',
                  telefono: ''
                }
              }
              enableReinitialize
              validationSchema={validationCliente}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <form className="my-4" onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 my-2">
                      <h3 className="border-b-2 pb-2 border-dotted border-gray-500">
                        TIPO DE PERSONA
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
                      {formik.values.tipo === 'PERSONA JURIDICA' && (
                        <>
                          <div className="w-full my-4">
                            <h3 className="border-b-2 pb-2 border-dotted border-gray-500">
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
                              <input
                                className={`input-box ${
                                  formik.errors.nit && formik.touched.nit
                                    ? 'border border-red-500 '
                                    : ''
                                }`}
                                id="grid-nit"
                                type="text"
                                name="nit"
                                value={formik.values.nit || ''}
                                placeholder="nit"
                                onChange={formik.handleChange}
                              />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-Business"
                              >
                                Razón Social
                              </label>
                              <input
                                className={`input-box ${
                                  formik.errors.razonSocial &&
                                  formik.touched.razonSocial
                                    ? 'border border-red-500 '
                                    : ''
                                }`}
                                id="grid-razon"
                                type="text"
                                name="razonSocial"
                                value={formik.values.razonSocial || ''}
                                placeholder="business name"
                                onChange={formik.handleChange}
                              />
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-Business"
                              >
                                ¿ Responsable de IVA ?
                              </label>
                              <Switch
                                value={formik.values.iva}
                                onChange={(value) => {
                                  formik.setFieldValue('iva', value);
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="w-full my-4">
                        <h3 className="border-b-2 pb-2 border-dotted border-gray-500">
                          {formik.values.tipo === 'PERSONA NATURAL'
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
                          <input
                            className={`input-box ${
                              formik.errors.nombres && formik.touched.nombres
                                ? 'border border-red-500 '
                                : ''
                            }`}
                            id="grid-name"
                            type="text"
                            name="nombres"
                            value={formik.values.nombres}
                            placeholder="Name"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-id"
                          >
                            Cédula
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.cedula && formik.touched.cedula
                                ? 'border border-red-500 '
                                : ''
                            }`}
                            id="grid-id"
                            type="number"
                            name="cedula"
                            value={formik.values.cedula}
                            placeholder="id"
                            onChange={formik.handleChange}
                          />
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
                          <input
                            className={`input-box ${
                              formik.errors.direccion &&
                              formik.touched.direccion
                                ? 'border border-red-500 '
                                : ''
                            }`}
                            id="grid-adress"
                            type="text"
                            name="direccion"
                            value={formik.values.direccion}
                            placeholder="Adress"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-email"
                          >
                            Email
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.email && formik.touched.email
                                ? 'border border-red-500 '
                                : ''
                            }`}
                            id="grid-email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            placeholder="Email"
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-phone"
                          >
                            Telefono
                          </label>
                          <input
                            className={`input-box ${
                              formik.errors.telefono && formik.touched.telefono
                                ? 'border border-red-500 '
                                : ''
                            }`}
                            id="grid-phone"
                            type="number"
                            name="telefono"
                            value={formik.values.telefono}
                            placeholder="phone"
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
