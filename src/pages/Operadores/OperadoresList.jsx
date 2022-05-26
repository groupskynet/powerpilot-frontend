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
import OperadoresServices from '../../services/OperadoresServices';
import OperadoresCreateOrUpdateModal from './OperadoresCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';

function OperadoresList() {
  const operadorModal = useModal(OperadoresCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);

  const [operadores, setOperadores] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const respOperadores = await OperadoresServices.get(pageNumber);
      if (respOperadores.status === 200) {
        setOperadores(respOperadores.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error,por favor intentelo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNewOperador = useCallback(() => {
    operadorModal.show().then((newOperador) => {
      setInfo({ type: 'success', message: 'Operador Creado Correctamente' });
      setOperadores((state) => ({
        ...state,
        data: [newOperador, ...state.data]
      }));
    });
  }, [operadorModal]);

  const handleEditOperadores = useCallback(
    (operador) => {
      operadorModal.show({ operador }).then((newOperador) => {
        setInfo({
          type: 'success',
          message: 'Operador Actualizado Correctamente'
        });
        setOperadores((state) => {
          const i = state.data.findIndex((m) => m.id === newOperador.id);
          const updated = { ...state.data[i], ...newOperador };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
      });
    },
    [operadorModal]
  );

  const handleDeleteOperador = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await OperadoresServices.delete(id);
          if (response.status === 200) {
            setOperadores((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Operador Eliminado Correctamente'
            });
          } else {
            setInfo({
              type: 'warning',
              message: response.message
            });
          }
        } catch (error) {
          setInfo({
            type: 'error',
            message: 'se ha producido un error,por favor intentelo más tarde.'
          });
        } finally {
          setLoading(false);
          deleteModal.remove();
        }
      });
    },
    [deleteModal]
  );

  if (loading) return <Loading />;

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
              onClick={() => {
                handleNewOperador();
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
        <Table columns={columns} title="Operadores">
          {operadores?.data?.length > 0 &&
            operadores?.data.map((item) => (
              <tr key={item.id}>
                <td>{new Intl.NumberFormat().format(item.cedula)}</td>
                <td>{`${item.nombres} ${item.apellidos}`}</td>
                <td>{item.telefono1}</td>
                <td>{item.telefono2 || 'N/A'}</td>
                <td>{item.direccion}</td>
                <td>{item.email}</td>
                <td className="flex justify-center">
                  <ButtonDownload />
                </td>
                <td className="items-center">
                  <ButtonEdit
                    onClick={() => {
                      handleEditOperadores(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteOperador(item.id);
                    }}
                  />
                </td>
              </tr>
            ))}
        </Table>
      </div>
    </div>
  );
}

export default OperadoresList;
