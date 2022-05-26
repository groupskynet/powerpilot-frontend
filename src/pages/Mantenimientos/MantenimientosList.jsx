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
import ButtonDownload from '../../components/ButtonDownload';
import Table from '../../components/Table';
import MantenimientosServices from '../../services/MantenimientosServices';
import Loading from '../../components/Loading';
import DeleteModal from '../Shared/DeleteModal';
import Pagination from '../../components/Pagination/Pagination';

function MantenimientosList() {
  const deleteModal = useModal(DeleteModal);

  const [info, setInfo] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await MantenimientosServices.get(pageNumber);
      if (response.status === 200) {
        setMantenimientos(response.data);
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

  const handleDeleteMantenimiento = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await MantenimientosServices.delete(id);
          if (response.status === 200) {
            setMantenimientos((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Mantenimiento Eliminado Correctamente'
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
            message: 'se ha producido un error, por favor intentelo más tarde.'
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
      { title: 'Mantenimientos', url: '/movimientos/mantenimientos' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'Tipo',
      'Maquina',
      'Proveedor',
      'Descripcion',
      'Modalidad de Pago',
      'Costo',
      'Factura',
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
            Mantenimiento
          </h2>
          <div className="flex">
            <Link
              to="/movimientos/mantenimientos/create"
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
        <Table columns={columns} title="Mantenimiento">
          {mantenimientos?.data?.length > 0 &&
            mantenimientos?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.tipo}</td>
                <td>{item.maquina.nombre}</td>
                <td>{item.proveedor.nombres}</td>
                <td>{item.descripcion}</td>
                <td>{item.modalidad}</td>
                <td>{item.costo}</td>
                <td className="flex justify-center">
                  <ButtonDownload />
                </td>
                <td className="items-center ">
                  <ButtonEdit />
                  <ButtonDelete onClick={() => handleDeleteMantenimiento()} />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={mantenimientos?.total ? mantenimientos?.total : 0}
          currentPage={
            mantenimientos?.current_page ? mantenimientos?.current_page : 0
          }
          pageSize={mantenimientos?.per_page ? mantenimientos?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default MantenimientosList;
