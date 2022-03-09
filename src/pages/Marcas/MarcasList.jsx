import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import ButtonView from '../../components/ButtonView';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import MarcasServices from '../../services/MarcasServices';
import CreateOrUpdateMarcas from './MarcaCreateOrUpdate';
import MarcasView from './MarcasView';

function MarcasList() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    (async function fetch() {
      try {
        const data = await MarcasServices.get();
        if (data.status === 200) {
          setMarcas(data.data);
        }
      } catch (error) {
        console.log('error');
      }
    })();
  }, []);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Marcas', url: '/gestion/marcas' }
    ],
    []
  );

  async function onClose() {
    const data = await MarcasServices.get();
    if (data.status === 200) {
      setMarcas(data.data);
    }
    setModal({ show: false, content: null });
  }

  const columns = useMemo(() => ['Nombre', 'Acciones'], []);

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
                  content: <CreateOrUpdateMarcas onClose={() => onClose()} />
                })
              }
            >
              Agregar
            </button>
          </div>
        </div>
        <Table columns={columns} title="Marcas">
          {marcas.length > 0 &&
            marcas.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td className="flex items-center  justify-between">
                  <ButtonView
                    onClick={() => {
                      setModal({
                        show: true,
                        content: (
                          <MarcasView
                            marca={{
                              nombre: 'Caterpilar'
                            }}
                          />
                        ),
                        size: 'modal-sm'
                      });
                    }}
                  />
                  <ButtonEdit
                    onClick={() =>
                      setModal({
                        show: true,
                        content: (
                          <CreateOrUpdateMarcas
                            id={item.id}
                            nombre={item.nombre}
                            onClose={() => onClose()}
                          />
                        ),
                        size: 'modal-md'
                      })
                    }
                  />
                  <ButtonDelete
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
        </Table>
      </div>
      {}
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
