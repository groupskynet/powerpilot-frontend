import React, { useEffect, useMemo, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import CreateOrUpdateMaquinas from './MaquinaCreateOrUpdate';
import Loading from '../../components/Loading';
import MaquinaServices from '../../services/MaquinasServices';

function MaquinasList() {
  const { promiseInProgress } = usePromiseTracker();

  const [maquinas, setMaquinas] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Máquinas', url: '/gestion/maquinas' }
    ],
    []
  );
  const columns = useMemo(
    () => [
      'Tipo',
      'Serie',
      'Nombre',
      'Marca',
      'Modelo',
      'Número de Registro',
      'Acciones'
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respMaquinas = await MaquinaServices.get();
        if (respMaquinas.status === 200) {
          setMaquinas(respMaquinas.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    trackPromise(fetch());
  }, []);

  function toggleModal(show) {
    setModal({ ...modal, show });
    MaquinaServices.get().then((resp) => {
      if (resp.status === 200) {
        setMaquinas(resp.data);
      }
    });
  }

  if (promiseInProgress) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Máquinas</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: (
                    <CreateOrUpdateMaquinas
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
        <Table columns={columns} title="Maquinas">
          {maquinas.map((item) => (
            <tr key={item.id}>
              <td>{item.tipo}</td>
              <td>{item.serie}</td>
              <td>{item.nombre}</td>
              <td>{item.marca.nombre}</td>
              <td>{item.modelo}</td>
              <td>{item.registro}</td>
              <td className="flex items-center">
                <ButtonEdit
                  onClick={() =>
                    setModal({
                      show: true,
                      content: (
                        <CreateOrUpdateMaquinas
                          maquina={{
                            ...item,
                            marca: item.marca.id,
                            placa: item.placa || ''
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
            trackPromise(MaquinaServices.delete(deleteModal.id)).then(() => {
              const filter = maquinas.filter(
                (item) => item.id !== deleteModal.id
              );
              setMaquinas(filter);
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

export default MaquinasList;
