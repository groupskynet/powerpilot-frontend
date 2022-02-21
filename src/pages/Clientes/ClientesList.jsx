import React, { useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import ButtonView from '../../components/ButtonView';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import uuid from '../../utils/uuid';
import CreateOrUpdateCliente from '../Shared/Cliente_ProveedorCreateOrUpdate';
import ClientesView from './ClientesView';

function ClientesList() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Clientes', url: '/servicios/clientes' }
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
      'Acciones'
    ],
    []
  );

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Clientes</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: (
                    <CreateOrUpdateCliente
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
        <Table columns={columns} title="Operadores">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <tr key={uuid()}>
              <td>1065848333</td>
              <td>Camilo Andres Colon</td>
              <td>3017764758</td>
              <td>3173827414</td>
              <td>Cll 18d #36 - 125 Villa Luz</td>
              <td>Colonca1999@gmail.com</td>
              <td className="flex items-center  justify-between">
                <ButtonView
                  onClick={() => {
                    setModal({
                      show: true,
                      content: (
                        <ClientesView
                          cliente={{
                            cedula: '1065848333',
                            nombres: 'Camilo Andres Colon Cañizares',
                            direccion: 'Cll 18d #36 - 125 Villa Luz',
                            email: 'Colonca1999@gmail.com',
                            telefono1: '301776478',
                            telefono2: '3173827414'
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
                        <CreateOrUpdateCliente
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

export default ClientesList;
