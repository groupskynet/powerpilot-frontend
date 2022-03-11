import React, { useEffect, useMemo, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import CreateOrUpdateAccesorio from './AccesorioCreateOrUpdate';
import Loading from '../../components/Loading';
import AccesoriosServices from '../../services/AccesoriosServices';

function AccesoriosList() {
  const { promiseInProgress } = usePromiseTracker();

  const [accesorios, setAccesorios] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Accesorio', url: '/gestion/accesorios' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'Máquina Asociada',
      'Nombre',
      'Marca',
      'Modelo',
      'Serie',
      'Número de Registro',
      'Acciones'
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respAccesorios = await AccesoriosServices.get();
        if (respAccesorios.status === 200) {
          setAccesorios(respAccesorios.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    trackPromise(fetch());
  }, []);

  function toggleModal(show) {
    setModal({ ...modal, show });
    AccesoriosServices.get().then((resp) => {
      if (resp === 200) {
        setAccesorios(resp.data);
      }
    });
  }

  if (promiseInProgress) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">
            Accesorios de Máquina
          </h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: (
                    <CreateOrUpdateAccesorio
                      toggleModal={(show) => toggleModal(show)}
                    />
                  )
                })
              }
            >
              Agregar
            </button>
          </div>
        </div>
        <Table columns={columns} title="Accesorios">
          {accesorios.map((item) => (
            <tr key={item.id}>
              <td>{item.maquina.nombre}</td>
              <td>{item.nombre}</td>
              <td>{item.marca.nombre}</td>
              <td>{item.modelo}</td>
              <td>{item.serie}</td>
              <td>{item.registro}</td>
              <td className="flex items-center">
                <ButtonEdit
                  onClick={() =>
                    setModal({
                      show: true,
                      content: (
                        <CreateOrUpdateAccesorio
                          accesorio={{
                            ...item,
                            marca: item.marca.id,
                            maquina: item.maquina.id
                          }}
                          toggleModal={(show) => toggleModal(show)}
                        />
                      ),
                      size: 'modal-md'
                    })
                  }
                />
                <ButtonDelete
                  onClick={() => {
                    setDeleteModal({ show: true, id: item.id });
                  }}
                />
              </td>
            </tr>
          ))}
        </Table>
      </div>
      {deleteModal.show && (
        <ModalDelete
          onDelete={() => {
            setDeleteModal({ ...deleteModal, show: false });
            trackPromise(AccesoriosServices.delete(deleteModal.id)).then(() => {
              const filter = accesorios.filter(
                (item) => item.id !== deleteModal.id
              );
              setAccesorios(filter);
            });
          }}
          onClose={() => setDeleteModal(false)}
        />
      )}
      {modal.show && (
        <Modal
          size={modal.size}
          onClose={() => {
            setModal({ show: false, content: null });
          }}
        >
          {modal.content}
        </Modal>
      )}
    </div>
  );
}

export default AccesoriosList;
