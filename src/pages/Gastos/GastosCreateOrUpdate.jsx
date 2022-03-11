import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import validationGastos from './Schema';

function CreateOrUpdateGastos({ onClose, id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      setData({
        id
      });
    }
  }, [id]);

  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nuevos' : 'Actualizar'} Gastos
      </h2>
      <Formik
        initialValues={
          data || {
            maquina: '',
            valor: '',
            descripcion: ''
          }
        }
        enableReinitialize
        validationSchema={validationGastos}
        onSubmit={() => {}}
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
                  <select
                    className={`"block appearance-none w-full bg-gray-200 ${
                      formik.errors.maquina && formik.touched.maquina
                        ? 'border border-red-500'
                        : ''
                    } 'text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'}`}
                    id="grid-maquina"
                    value={formik.values.maquina}
                    name="maquina"
                    onChange={formik.handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="CATERPILLAR">Caterpillar</option>
                    <option value="KOMATSU"> Komatsu</option>
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
              <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-cost"
                >
                  Valor
                </label>
                <input
                  className={`input-box ${
                    formik.errors.valor && formik.touched.valor
                      ? 'border border-red-500'
                      : ''
                  }`}
                  id="grid-valor"
                  type="number"
                  name="valor"
                  value={formik.values.valor}
                  placeholder="valor"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-descripcion"
                >
                  Descripción
                </label>
                <textarea
                  className={`block w-full px-3 py-1 text-base font-normal text-gray-700 bg-gray-200 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                    formik.errors.descripcion && formik.touched.descripcion
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
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOrUpdateGastos;
