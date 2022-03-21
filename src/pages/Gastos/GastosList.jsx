import React, { useEffect, useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import GastosServices from '../../services/GastosServices';
import CreateOrUpdateGastos from './GastosCreateOrUpdate';

function GastosList() {
  const [modal, setModal] = useState({
    show: false,
    content: null,
    size: 'modal-sm'
  });
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    (async function fetch() {
      try {
        const data = await GastosServices.get();
        if (data.status === 200) {
          setGastos(data.data);
        }
      } catch (error) {
        console.log('error');
      }
    })();
  }, []);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Gastos', url: '/gestion/gastos' }
    ],
    []
  );

  async function onClose() {
    const data = await GastosServices.get();
    if (data.status === 200) {
      setGastos(data.data);
    }
    setModal({ show: false, content: null });
  }

  const columns = useMemo(
    () => ['Maquina', 'Descripcion', 'Valor', 'soporte', 'Acciones'],
    []
  );

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Gastos</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                setModal({
                  show: true,
                  size: 'modal-md',
                  content: <CreateOrUpdateGastos onClose={() => onClose()} />
                })
              }
            >
              Agregar
            </button>
          </div>
        </div>
        <Table columns={columns} title="Gastos">
          {gastos.length > 0 &&
            gastos.map((item) => (
              <tr key={item.id}>
                <td>{item.maquina.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.valor}</td>
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
                          <CreateOrUpdateGastos
                            id={item.id}
                            maquina={item.maquina}
                            descripcion={item.descripcion}
                            valor={item.valor}
                            onClose={() => onClose()}
                          />
                        ),
                        size: 'modal-md'
                      })
                    }
                  />
                  <ButtonDelete onClick={() => {}} />
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

export default GastosList;
