import React, { useCallback, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Table from '../../components/Table';
import OrdenServicioServices from '../../services/OrdenServicioServices';
import Loading from '../../components/Loading';
import OrdenServicioCreateOrUpdate from './OrdenServicioCreateOrUpdate';
import DeleteModal from '../Shared/DeleteModal';
import Pagination from '../../components/Pagination/Pagination';

function OrdenServicioList() {
  const ordenServicioModal = useModal(OrdenServicioCreateOrUpdate);
  const deleteModal = useModal(DeleteModal);

  const [info, setInfo] = useState(null);
  const [ordenServicios, setOrdenServicio] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await OrdenServicioServices.get(pageNumber);
      if (response.status === 200) {
        setOrdenServicio(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error,por favor intentelo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewOrdenServicio = useCallback(() => {
    ordenServicioModal.show().then((newOrdenServicio) => {
      setInfo({
        type: 'success',
        message: 'Orden de servicio Creada Correctamente'
      });
      setOrdenServicio((state) => ({
        ...state,
        data: [newOrdenServicio, ...state.data]
      }));
    });
  }, [ordenServicioModal]);

  const handleEditOrdenServicio = useCallback(
    (ordenServicio) => {
      ordenServicioModal.show({ ordenServicio }).then((newOrdenServicio) => {
        setInfo({
          type: 'success',
          message: 'Orden de Servicio Actualizada Correctamente'
        });
        setOrdenServicio((state) => {
          const i = state.data.findIndex((m) => m.id === newOrdenServicio.id);
          const updated = { ...state.data[i], ...newOrdenServicio };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
      });
    },
    [ordenServicioModal]
  );

  const handleDeleteOrdenServicio = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await OrdenServicioServices.delete(id);
          if (response.status === 200) {
            setOrdenServicio((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Orden de Servicio Eliminada Correctamente'
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

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'ordenServicio', url: '/gestion/ordenServicio' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'Orden',
      'Cliente',
      'Maquina',
      'Horas Promedio',
      'Horometro Inicial',
      'Pagare',
      'Acciones'
    ],
    []
  );

  if (loading) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">
            Orden de Servicio
          </h2>
          <div className="flex">
            <Link
              to="/servicios/orden-servicio/new"
              className="btn btn-success"
            >
              Agregar
            </Link>
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
        <Table columns={columns} title="OrdenServicio">
          {ordenServicios?.data?.length > 0 &&
            ordenServicios?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cliente.nombres}</td>
                <td>{item.maquina.nombre}</td>
                <td>{item.horasPromedio}</td>
                <td>{item.horometroInicial}</td>
                <td className="justify-center">
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
                <td className="flex items-center ">
                  <ButtonEdit
                    onClick={() => {
                      handleEditOrdenServicio(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => handleDeleteOrdenServicio(item.id)}
                  />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={ordenServicios?.total ? ordenServicios?.total : 0}
          currentPage={
            ordenServicios?.current_page ? ordenServicios?.current_page : 0
          }
          pageSize={ordenServicios?.per_page ? ordenServicios?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default OrdenServicioList;
