import React, { useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import ButtonView from '../../components/ButtonView';
import Modal from '../../components/Modal';
import ModalDelete from '../../components/ModalDelete';
import Table from '../../components/Table';
import uuid from '../../utils/uuid';
import CreateOrUpdateMaquinas from './MaquinaCreateOrUpdate';
import MaquinasView from './MaquinasView';

function MaquinasList() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [deleteModal, setDeleteModal] = useState(false);
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
        <Table columns={columns} title="Maquinas">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <tr key={uuid()}>
              <td>Maquina</td>
              <td>GGA55454545AJNJN</td>
              <td>Mini Cargador</td>
              <td>BobCat</td>
              <td>S185</td>
              <td>jksj555d88d555d</td>
              <td className="flex items-center  justify-between">
                <ButtonView
                  onClick={() => {
                    setModal({
                      show: true,
                      content: (
                        <MaquinasView
                          maquina={{
                            nombre: 'Minicargador',
                            marca: 'bobocat'
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
                        <CreateOrUpdateMaquinas
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

export default MaquinasList;
