import React, { useEffect, useMemo, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import CreateOrUpdateOperador from './OperadoresCreateOrUpdate';
import Loading from '../../components/Loading';
import OperadoresServices from '../../services/OperadoresServices';

function OperadoresList() {
  const { promiseInProgress } = usePromiseTracker();

  const [operadores, setOperadores] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Operadores', url: '/gestion/operadores' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'Cedula',
      'Nombres',
      'Telefono 1',
      'Telefono 2',
      'Direccion',
      'Email',
      'licencia',
      'Acciones'
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respOperadores = await OperadoresServices.get();
        if (respOperadores.status === 200) {
          setOperadores(respOperadores.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    trackPromise(fetch());
  }, []);

  function toogleModal(show) {
    setModal({ ...modal, show });
    OperadoresServices.get().then((resp) => {
      if (resp.status === 200) {
        setOperadores(resp.data);
      }
    });
  }
  if (promiseInProgress) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Operadores</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: (
                    <CreateOrUpdateOperador
                      toogleModal={(show) => toogleModal(show)}
                    />
                  )
                })
              }
            >
              Agregar
            </button>
          </div>
        </div>
        <Table columns={columns} title="Operadores">
          {operadores.map((item) => (
            <tr key={item.id}>
              <td>{item.cedula}</td>
              <td>{`${item.nombres} ${item.apellidos}`}</td>
              <td>{item.telefono1}</td>
              <td>{item.telefono2}</td>
              <td>{item.direccion}</td>
              <td>{item.email}</td>
              <td className="flex justify-center">
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </td>
              <td className="items-center">
                <ButtonEdit
                  onClick={() =>
                    setModal({
                      show: true,
                      content: (
                        <CreateOrUpdateOperador
                          operador={{
                            ...item,
                            telefono2: item.telefono2 || ''
                          }}
                          toogleModal={(show) => toogleModal(show)}
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
            trackPromise(OperadoresServices.delete(deleteModal.id)).then(() => {
              const filter = operadores.filter(
                (item) => item.d !== deleteModal.id
              );
              setOperadores(filter);
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

export default OperadoresList;
