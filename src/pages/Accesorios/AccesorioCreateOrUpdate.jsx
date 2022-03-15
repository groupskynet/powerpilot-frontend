import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { trackPromise } from 'react-promise-tracker';
import validationAccesorio from './Schema';
import MaquinasServices from '../../services/MaquinasServices';
import MarcasServices from '../../services/MarcasServices';
import AccesoriosServices from '../../services/AccesoriosServices';

function CreateOrUpdateAccesorio({ toggleModal, accesorio }) {
  const [marcas, setMarcas] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(accesorio);
  }, [accesorio]);

  useEffect(() => {
    async function fetch() {
      try {
        const respMarcas = await MarcasServices.get();
        if (respMarcas.status === 200) {
          setMarcas(respMarcas.data);
        }

        const respMaquinas = await MaquinasServices.get();
        if (respMaquinas.status === 200) {
          setMaquinas(respMaquinas.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (marcas.length === 0 || maquinas.length === 0) fetch();
  }, [marcas, maquinas]);

  return (
    <div className="">
      <h2 className="font-semibold">
        {accesorio && accesorio.id ? 'Actualizar' : 'Nuevo'} Accesorio
      </h2>
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
          if (values.id) {
            trackPromise(AccesoriosServices.update(values)).then(() => {
              toggleModal(false);
            });
          } else {
            trackPromise(AccesoriosServices.post(values)).then(() => {
              toggleModal(false);
            });
          }
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
                  <select
                    className={`"block appearance-none w-full bg-gray-200 ${
                      formik.errors.marca && formik.touched.marca
                        ? 'border border-red-500'
                        : ''
                    } 'text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'}`}
                    id="grid-marca"
                    name="marca"
                    value={formik.values.marca}
                    onChange={formik.handleChange}
                  >
                    <option value="">Seleccionar</option>
                    {marcas.map((item) => (
                      <option value={item.id}>{item.nombre}</option>
                    ))}
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
                  <select
                    className={`"block appearance-none w-full bg-gray-200 ${
                      formik.errors.maquina && formik.touched.maquina
                        ? 'border border-red-500'
                        : ''
                    } 'text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'}`}
                    id="grid-marca"
                    value={formik.values.maquina}
                    name="maquina"
                    onChange={formik.handleChange}
                  >
                    <option value="">Seleccionar</option>
                    {maquinas.map((item) => (
                      <option value={item.id}>{item.nombre}</option>
                    ))}
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
            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={() => toggleModal(false)}
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
export default CreateOrUpdateAccesorio;
