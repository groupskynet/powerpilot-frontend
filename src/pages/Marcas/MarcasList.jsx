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
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Table from '../../components/Table';
import MarcasServices from '../../services/MarcasServices';
import Loading from '../../components/Loading';
import MarcaCreateOrUpdateModal from './MarcaCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';
import Pagination from '../../components/Pagination/Pagination';

function MarcasList() {
  const marcaModal = useModal(MarcaCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);

  const [info, setInfo] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await MarcasServices.get(pageNumber);
      if (response.status === 200) {
        setMarcas(response.data);
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

  const handleNewMarca = useCallback(() => {
    marcaModal.show().then((newMarca) => {
      setInfo({ type: 'success', message: 'Marca Creada Correctamente' });
      setMarcas((state) => ({ ...state, data: [newMarca, ...state.data] }));
    });
  }, [marcaModal]);

  const handleEditMarca = useCallback(
    (marca) => {
      marcaModal.show({ marca }).then((newMarca) => {
        setInfo({
          type: 'success',
          message: 'Marca Actualizada Correctamente'
        });
        setMarcas((state) => {
          const i = state.data.findIndex((m) => m.id === newMarca.id);
          const updated = { ...state.data[i], ...newMarca };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
      });
    },
    [marcaModal]
  );

  const handleDeleteMarca = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await MarcasServices.delete(id);
          if (response.status === 200) {
            setMarcas((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Marca Eliminada Correctamente'
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
      { title: 'Marcas', url: '/gestion/marcas' }
    ],
    []
  );

  const columns = useMemo(() => ['Nombre', 'Acciones'], []);

  if (loading) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Marcas</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewMarca();
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
        <Table columns={columns} title="Marcas">
          {marcas?.data?.length > 0 &&
            marcas?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td className="flex items-center ">
                  <ButtonEdit
                    onClick={() => {
                      handleEditMarca(item);
                    }}
                  />
                  <ButtonDelete onClick={() => handleDeleteMarca(item.id)} />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={marcas?.total ? marcas?.total : 0}
          currentPage={marcas?.current_page ? marcas?.current_page : 0}
          pageSize={marcas?.per_page ? marcas?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default MarcasList;
