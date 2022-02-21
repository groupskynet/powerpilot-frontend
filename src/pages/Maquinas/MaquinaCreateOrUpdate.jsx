import React from 'react';

function CreateOrUpdateMaquina({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nueva' : 'Actualizar'} Máquina
      </h2>
      <form className="my-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Nombre
            </label>
            <input
              className="input-box"
              id="grid-name"
              type="text"
              placeholder="name"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-marca"
            >
              Marca|
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-marca"
              >
                <option>Seleccionar</option>
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
              className="input-box"
              id="grid-model"
              type="text"
              placeholder="model"
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
              className="input-box"
              id="grid-serie"
              type="text"
              placeholder="serie"
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
              className="input-box"
              id="grid-line"
              type="text"
              placeholder="line"
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
              className="input-box"
              id="grid-regitry"
              type="text"
              placeholder="registry"
            />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-plate"
            >
              Placa
            </label>
            <input
              className="input-box"
              id="grid-plate"
              type="text"
              placeholder="plate"
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
    </div>
  );
}

export default CreateOrUpdateMaquina;
