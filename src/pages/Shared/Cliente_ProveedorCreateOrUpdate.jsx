import React from 'react';
import { Formik } from 'formik';
import Switch from '../../components/Switch';

function CreateOrUpdateClienteProveedor({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nuevo' : 'Actualizar'} Cliente
      </h2>
      <Formik
        initialValues={{
          tipo: '',
          information: {
            nit: '',
            razonSocial: '',
            iva: false,
          }
        }}
        onSubmit={(values) => {
          console.log(values);
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
              <div className="w-full md:w-1/3 px-3 mt-4">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-marca"
                    value={formik.values.tipo}
                    name="tipo"
                    onChange={formik.handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="PERSONA NATURAL">Persona Natural</option>
                    <option value="PERSONA JURIDICA">Persona Jurídica</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
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
                          className="input-box"
                          id="grid-nit"
                          type="text"
                          name="information.nit"
                          value={formik.values.information.nit || ''}
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
                          className="input-box"
                          id="grid-razon"
                          type="text"
                          name="information.razonSocial"
                          value={formik.values.information.razonSocial}
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
                          onChange={value => {
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
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-name"
                    >
                      Nombres
                    </label>
                    <input
                      className="input-box"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-lastName"
                    >
                      Apellidos
                    </label>
                    <input
                      className="input-box"
                      id="grid-lastName"
                      type="text"
                      placeholder="LastName"
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
                      className="input-box"
                      id="grid-id"
                      type="text"
                      placeholder="id"
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
                      className="input-box"
                      id="grid-adress"
                      type="text"
                      placeholder="Adress"
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
                      className="input-box"
                      id="grid-email"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-phone"
                    >
                      Phone
                    </label>
                    <input
                      className="input-box"
                      id="grid-phone"
                      type="text"
                      placeholder="phone"
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
                    onClick={() => onClose()}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOrUpdateClienteProveedor;
