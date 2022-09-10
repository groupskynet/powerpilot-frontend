import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton
} from '@chakra-ui/react';
import { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import ButtonDownload from '../../components/ButtonDownload';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import GastosCreateOrUpdateModal from './GastosCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';
import GastosServices from '../../services/GastosServices';
import ModalPdf from '../../components/ModalPdf';

function GastosList() {
  const gastoModal = useModal(GastosCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);
  const documentoModal = useModal(ModalPdf);

  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Gastos', url: '/gestion/gastos' }
    ],
    []
  );

  const columns = useMemo(
    () => ['Maquina', 'Descripcion', 'Valor', 'soporte', 'Acciones'],
    []
  );

  const handleNewGasto = useCallback(() => {
    gastoModal.show().then((newGasto) => {
      setInfo({ type: 'success', message: 'Gasto Creado Correctamente' });
      setGastos((state) => ({ ...state, data: [newGasto, ...state.data] }));
    });
  }, [gastoModal]);

  const handleEditGasto = useCallback(
    (gasto) => {
      gastoModal.show({ gasto }).then((newGasto) => {
        setGastos((state) => {
          const i = state.data.findIndex((m) => m.id === newGasto.id);
          const updated = { ...state.data[i], ...newGasto };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
        setInfo({
          type: 'success',
          message: 'Gasto Actualizado Correctamente'
        });
      });
    },
    [gastoModal]
  );

  const handleDeleteGasto = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await GastosServices.delete(id);
          if (response.status === 200) {
            setGastos((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Gasto Eliminado Correctamente'
            });
          } else {
            setInfo({
              type: 'warning',
              message: response.message
            });
          }
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
          deleteModal.remove();
        }
      });
    },
    [deleteModal]
  );

  async function fetchData(pageNumber = 1) {
    try {
      setLoading(true);
      const response = await GastosServices.get(pageNumber);
      if (response.status === 200) {
        setGastos(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde'
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

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
              onClick={() => {
                handleNewGasto();
              }}
            >
              Agregar
            </button>
          </div>
        </div>
        {info && (
          <div className="mb-2">
            <Alert status={info.type}>
              <AlertIcon />
              <Box flex="1">
                <AlertDescription display="block">
                  {info.message}
                </AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setInfo(null)}
              />
            </Alert>
          </div>
        )}
        <Table columns={columns} title="Gastos">
          {gastos?.data?.length &&
            gastos?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.maquina.nombre}</td>
                <td>{item.descripcion}</td>
                <td>$ {new Intl.NumberFormat('es-CO').format(item.valor)}</td>
                <td className="flex items-center">
                  <ButtonDownload
                    onClick={() =>
                      documentoModal.show({ soporte: item.soporte })
                    }
                  />
                </td>
                <td className="items-center">
                  <ButtonEdit
                    onClick={() => {
                      handleEditGasto(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteGasto(item.id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={gastos?.total ? gastos?.total : 0}
          currentPage={gastos?.current_page ? gastos?.current_page : 0}
          pageSize={gastos?.per_page ? gastos?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default GastosList;
