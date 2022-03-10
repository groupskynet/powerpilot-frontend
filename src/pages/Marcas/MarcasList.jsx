import React, { useEffect, useMemo, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import MarcasServices from '../../services/MarcasServices';
import CreateOrUpdateMarcas from './MarcaCreateOrUpdate';
import ModalDelete from '../../components/ModalDelete';
import Loading from '../../components/Loading';

function MarcasList() {
  const { promiseInProgress } = usePromiseTracker();

  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await MarcasServices.get();
        if (data.status === 200) {
          setMarcas(data.data);
        }
      } catch (error) {
        console.log('error');
      }
    }
    trackPromise(fetch());
  }, []);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Márcas', url: '/gestion/marcas' }
    ],
    []
  );

  async function toggleModal(show) {
    const data = await MarcasServices.get();
    if (data.status === 200) {
      setMarcas(data.data);
    }
    setModal({ ...modal, show });
  }

  const columns = useMemo(() => ['Nombre', 'Acciones'], []);

  if (promiseInProgress) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Marcas</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: (
                    <CreateOrUpdateMarcas
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
          {marcas.length > 0 &&
            marcas.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td className="flex items-center ">
                  <ButtonEdit
                    onClick={() =>
                      setModal({
                        show: true,
                        content: (
                          <CreateOrUpdateMarcas
                            id={item.id}
                            nombre={item.nombre}
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
            setDeleteModal({ show: false, id: null });
            trackPromise(MarcasServices.delete(deleteModal.id)).then(() => {
              const filter = marcas.filter(
                (item) => item.id !== deleteModal.id
              );
              setMarcas(filter);
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

export default MarcasList;
