import React from 'react';

function CreateOrUpdateOperador({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nuevo' : 'Actualizar'} Operador
      </h2>
      <form className="my-4">
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
              placeholder="id"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Apellido
            </label>
            <input
              className="input-box"
              id="grid-last-name"
              type="text"
              placeholder="last name"
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
              placeholder="id"
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
              placeholder="phone 1"
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
              placeholder="phone 2"
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
              placeholder=""
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
              placeholder="adress"
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
              placeholder="email"
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

export default CreateOrUpdateOperador;
