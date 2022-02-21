import React, { useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import ButtonView from '../../components/ButtonView';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import uuid from '../../utils/uuid';
import CreateOrUpdateAccesorio from './AccesorioCreateOrUpdate';
import AccesoriosView from './AccesoriosView';

function AccesoriosList() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState(false);
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
                      onClose={() => setModal({ show: false, content: null })}
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <tr key={uuid()}>
              <td>Minicargador</td>
              <td>Balde</td>
              <td>Caterpilar</td>
              <td>S185</td>
              <td>dfghjgfh</td>
              <td>fcgvhbnj451dfghbnj56</td>
              <td className="flex items-center  justify-between">
                <ButtonView
                  onClick={() => {
                    setModal({
                      show: true,
                      content: (
                        <AccesoriosView
                          accesorio={{
                            nombre: 'Balde',
                            marca: 'Caterpilar'
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
                        <CreateOrUpdateAccesorio
                          id={uuid()}
                          onClose={() =>
                            setModal({ show: false, content: null })
                          }
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
      {deleteModal && <ModalDelete onClose={() => setDeleteModal(false)} />}
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
