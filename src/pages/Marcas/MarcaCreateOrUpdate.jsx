import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { trackPromise } from 'react-promise-tracker';
import validationMarca from './Schema';
import MarcasServices from '../../services/MarcasServices';

function CreateOrUpdateMarca({ toggleModal, id, nombre }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      setData({
        id,
        nombre
      });
    }
  }, [id, nombre]);

  return (
    <div className="">
      <h2 className="font-semibold">
        {id === null || id === undefined ? 'Nueva' : 'Actualizar'} Marca
      </h2>
      <Formik
        initialValues={
          data || {
            id: '',
            nombre: ''
          }
        }
        enableReinitialize
        validationSchema={validationMarca}
        onSubmit={(values) => {
          const fetch = async () => {
            try {
              let res = null;
              if (values.id !== '') {
                res = await MarcasServices.update(values);
              } else {
                res = await MarcasServices.post(values);
              }
              if (res.status === 200) {
                toggleModal(false);
              }
            } catch (execption) {
              console.log(execption);
            }
          };
          toggleModal(false);
          trackPromise(fetch()).catch(() => {
            toggleModal(true);
          });
        }}
      >
        {(formik) => (
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
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

export default CreateOrUpdateMarca;
