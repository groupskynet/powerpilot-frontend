import React from 'react';
import { Formik } from 'formik';
import validationMaquina from './Schema';

function CreateOrUpdateMaquina({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nueva' : 'Actualizar'} Máquina
      </h2>
      <Formik
        initialValues={{
          tipo: '',
          nombre: '',
          marca: '',
          modelo: '',
          serie: '',
          linea: '',
          registry: '',
          Vehiculo: { placa: '' }
        }}
        validationSchema={validationMaquina}
        onSubmit={() => {}}
      >
        {(formik) => (
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 my-2">
                <h3 className="border-b-2 pb-2 border-dotted border-gray-500">
                  TIPO
                </h3>
              </div>
              <div className="w-full md:w-1/3 px-3 mt-4">
                <div className="relative">
                  <select
                    className={`"block appearance-none w-full bg-gray-200 ${
                      formik.errors.tipo ? 'border border-red-500' : ''
                    } 'text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'}`}
                    id="grid-tipo"
                    value={formik.values.tipo}
                    name="tipo"
                    onChange={formik.handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="MAQUINA">Máquina</option>
                    <option value="VEHICULO">Vehículo</option>
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
                        formik.errors.nombre ? 'border border-red-500' : ''
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
                          formik.errors.marca ? 'border border-red-500' : ''
                        } 'text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"'}`}
                        id="grid-marca"
                        value={formik.values.marca}
                        name="marca"
                        onChange={formik.handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option>Caterpillar</option>
                        <option>Komatsu</option>
                        <option>Hitachi</option>
                        <option>Terex</option>
                        <option>Jhon Deere</option>
                        <option>XCMG</option>
                        <option>Liebherr</option>
                        <option>Doosan Infracore</option>
                        <option>Volvo</option>
                        <option>Zoomlion</option>
                        <option>Sany</option>
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
                        formik.errors.modelo ? 'border border-red-500' : ''
                      }`}
                      id="grid-model"
                      type="text"
                      name="model"
                      value={formik.values.modelo}
                      placeholder="model"
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div
                    className={`"w-full  ${
                      formik.values.tipo === 'MAQUINA' ? 'md:w-1/3' : 'md:w-1/4'
                    }  px-3 mb-6 md:mb-0"`}
                  >
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-serie"
                    >
                      Serie
                    </label>
                    <input
                      className={`input-box ${
                        formik.errors.serie ? 'border border-red-500' : ''
                      }`}
                      id="grid-serie"
                      type="text"
                      name="serie"
                      value={formik.values.serie}
                      placeholder="serie"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div
                    className={`"w-full  ${
                      formik.values.tipo === 'MAQUINA' ? 'md:w-1/3' : 'md:w-1/4'
                    }  px-3 mb-6 md:mb-0"`}
                  >
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-line"
                    >
                      Linea
                    </label>
                    <input
                      className={`input-box ${
                        formik.errors.linea ? 'border border-red-500' : ''
                      }`}
                      id="grid-line"
                      type="text"
                      name="linea"
                      value={formik.values.linea}
                      placeholder="line"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div
                    className={`"w-full  ${
                      formik.values.tipo === 'MAQUINA' ? 'md:w-1/3' : 'md:w-1/4'
                    }  px-3 mb-6 md:mb-0"`}
                  >
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-registry"
                    >
                      Número de Registro
                    </label>
                    <input
                      className={`input-box ${
                        formik.errors.registry ? 'border border-red-500' : ''
                      }`}
                      id="grid-regitry"
                      type="text"
                      name="registry"
                      value={formik.values.registry}
                      placeholder="registry"
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.values.tipo === 'VEHICULO' && (
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-plate"
                      >
                        Placa
                      </label>
                      <input
                        className={`input-box ${
                          formik.errors.placa ? 'border border-red-500' : ''
                        }`}
                        id="grid-plate"
                        type="text"
                        name="plate"
                        value={formik.values.placa}
                        placeholder="plate"
                      />
                    </div>
                  )}
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

export default CreateOrUpdateMaquina;
