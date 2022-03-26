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
import DeleteModal from '../Shared/DeleteModal';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination/Pagination';
import AccesorioCreateOrUpdateModal from './AccesorioCreateOrUpdate';
import Loading from '../../components/Loading';
import AccesoriosServices from '../../services/AccesoriosServices';

function AccesoriosList() {
  const accesorioModal = useModal(AccesorioCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);
  const [accesorios, setAccesorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Accesorios', url: '/gestion/accesorios' }
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

  const handleNewAccesorio = useCallback(() => {
    accesorioModal.show().then((newAccesorio) => {
      setInfo({ type: 'success', message: 'Accesorio Creado Correctamente' });
      setAccesorios((state) => ({
        ...state,
        data: [newAccesorio, ...state.data]
      }));
    });
  }, [accesorioModal]);

  const handleEditAccesorio = useCallback(
    (accesorio) => {
      accesorioModal.show({ accesorio }).then((newAccesorio) => {
        setAccesorios((state) => {
          const i = state.data.findIndex((m) => m.id === newAccesorio.id);
          const updated = { ...state.data[i], ...accesorio };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
        setInfo({
          type: 'success',
          message: ' Accesorio Actualizado Correctamente'
        });
      });
    },
    [accesorioModal]
  );

  const handleDeleteAccesorio = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await AccesoriosServices.delete(id);
          if (response.status === 200) {
            setAccesorios((state) => {
              const list = state.data.filter((item) => item.data !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Accesorio Eliminado Correctamente'
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
            message: 'se ha producido un error, por favor intentelo mas tarde'
          });
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
      const response = await AccesoriosServices.get(pageNumber);
      if (response.status === 200) {
        setAccesorios(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido error, por favor intentelo más tarde'
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
          <h2 className="font-semibold text-gray-800 flex-grow">
            Accesorios de Máquina
          </h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewAccesorio();
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
        <Table columns={columns} title="Accesorios">
          {accesorios?.data?.length &&
            accesorios?.data.map((item) => (
              <tr key={item.id}>
                <td>{item.maquina.nombre}</td>
                <td>{item.nombre}</td>
                <td>{item.marca.nombre}</td>
                <td>{item.modelo}</td>
                <td>{item.serie}</td>
                <td>{item.registro}</td>
                <td className="flex items-center">
                  <ButtonEdit
                    onClick={() => {
                      handleEditAccesorio(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteAccesorio(item.id);
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
          totalCount={accesorios?.total ? accesorios?.total : 0}
          currentPage={accesorios?.currentPage ? accesorios?.currentPage : 0}
          pageSize={accesorios?.per_page ? accesorios?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default AccesoriosList;
