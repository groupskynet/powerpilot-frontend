import React from 'react';

function CreateOrUpdateClienteProveedor({ onClose, id }) {
  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nuevo' : 'Actualizar'} Cliente
      </h2>
      <form className="my-4">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3">
            <h3>Tipo</h3>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-marca"
            >
              Tipo de Persona
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-marca"
              >
                <option>Seleccionar</option>
                <option>Persona Natural</option>
                <option>Persona Jurídica</option>
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
        <h3>Datos de la Empresa</h3>
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
              type="number"
              placeholder="nit"
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
              placeholder="business name"
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-iva"
            >
              Responsable de iva
            </label>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioIva"
                id="flexRadioIva"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexRadioIva"
              >
                Si
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioIvaNo"
                id="flexRadioIvaNo"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexRadioIvaNO"
              >
                No
              </label>
            </div>
          </div>
        </div>
        <h3>Representante Legal </h3>
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

export default CreateOrUpdateClienteProveedor;
