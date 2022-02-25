import React from 'react';
import { Formik } from 'formik';

function CreateOrUpdateOperador({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nuevo' : 'Actualizar'} Operador
      </h2>
      <Formik
        initialValues={{
          nombres: '',
          apellidos: '',
          cedula: '',
          telefono1: '',
          telefono2: '',
          licencia: '',
          direccion: '',
          email: ''
        }}
        onSubmit={() => {}}
      >
        {(formik) => (
          <form className="my-4" onSubmit={formik.handleChange}>
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
                  value={formik.values.nombres}
                  placeholder="id"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Apellidos
                </label>
                <input
                  className="input-box"
                  id="grid-last-name"
                  type="text"
                  name="apellidos"
                  values={formik.values.apellidos}
                  placeholder="last name"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-id"
                >
                  Cédula
                </label>
                <input
                  className="input-box"
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
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-phone-1"
                >
                  Teléfono 1
                </label>
                <input
                  className="input-box"
                  id="grid-phone-1"
                  type="number"
                  name="telefono1"
                  value={formik.values.telefono1}
                  placeholder="phone 1"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-phone-2"
                >
                  Teléfono 2
                </label>
                <input
                  className="input-box"
                  id="grid-phone-2"
                  type="tel"
                  name="telefono2"
                  value={formik.values.telefono2}
                  placeholder="phone 2"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-licence"
                >
                  Licencia
                </label>
                <input
                  className="input-box"
                  id="grid-licence"
                  type="file"
                  name="licencia"
                  value={formik.values.licencia}
                  placeholder=""
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3">
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
                  name="direccion"
                  value={formik.values.direccion}
                  placeholder="adress"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Correo Electrónico
                </label>
                <input
                  className="input-box"
                  id="grid-email"
                  type="email"
                  name="email"
                  value={formik.values.direccion}
                  placeholder="email"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="button" className="btn btn-success">
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
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOrUpdateOperador;
