import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Button
} from '@chakra-ui/react';
import { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonDelete from '../../components/ButtonDelete';
import ButtonEdit from '../../components/ButtonEdit';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import MaquinaServices from '../../services/MaquinasServices';
import Pagination from '../../components/Pagination/Pagination';
import MaquinaCreateOrUpdateModal from './MaquinaCreateOrUpdateModal';
import AsignarOperadorCreateOrUpdateModal from './AsignarOperadorCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';

function MaquinasList() {
  const maquinaModal = useModal(MaquinaCreateOrUpdateModal);
  const AsignarOperadorModal = useModal(AsignarOperadorCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

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
      'Operador',
      'Acciones'
    ],
    []
  );

  const handleNewMaquina = useCallback(() => {
    maquinaModal.show().then((newMaquina) => {
      setInfo({ type: 'success', message: 'Maquina Creada Correctamente' });
      setMaquinas((state) => ({ ...state, data: [newMaquina, ...state.data] }));
    });
  }, [maquinaModal]);
  const handleAsignarOperador = useCallback(() => {
    AsignarOperadorModal.show().then((newMaquina) => {
      setMaquinas((state) => {
        const i = state.data.findIndex((m) => m.id === newMaquina.id);
        const updated = { ...state.data[i], ...newMaquina };
        const arr = [...state.data];
        arr.splice(i, 1, updated);
        return { ...state, data: arr };
      });
      setInfo({ type: 'success', message: 'Operador asignado Correctamente' });
    });
  }, [AsignarOperadorModal]);

  const handleEditMaquina = useCallback(
    (maquina) => {
      maquinaModal.show({ maquina }).then((newMaquina) => {
        setMaquinas((state) => {
          const i = state.data.findIndex((m) => m.id === newMaquina.id);
          const updated = { ...state.data[i], ...newMaquina };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
        setInfo({
          type: 'success',
          message: 'Maquina Actualizada Correctamente'
        });
      });
    },
    [maquinaModal]
  );
  const handleDeleteMaquina = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await MaquinaServices.delete(id);
          if (response.status === 200) {
            setMaquinas((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Maquina Eliminada Correctamente'
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

  async function fetchData(pageNumber = 1) {
    try {
      setLoading(true);
      const response = await MaquinaServices.get(pageNumber);
      if (response.status === 200) {
        setMaquinas(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
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
          <h2 className="font-semibold text-gray-800 flex-grow">Máquinas</h2>
          <div className="flex mr-3">
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => {
                handleAsignarOperador();
              }}
            >
              Asignar Operador
            </Button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewMaquina();
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
        <Table columns={columns} title="Maquinas">
          {maquinas?.data?.length &&
            maquinas?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.tipo}</td>
                <td>{item.serie}</td>
                <td>{item.nombre}</td>
                <td>{item.marca.nombre}</td>
                <td>{item.modelo}</td>
                <td>{item.registro}</td>
                <td>
                  {item.operador
                    ? `${item.operador.nombres} ${item.operador.apellidos}`
                    : 'SIN ASIGNAR'}
                </td>
                <td className="flex items-center">
                  <ButtonEdit
                    onClick={() => {
                      handleEditMaquina(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteMaquina(item.id);
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
          totalCount={maquinas?.total ? maquinas?.total : 0}
          currentPage={maquinas?.current_page ? maquinas?.current_page : 0}
          pageSize={maquinas?.per_page ? maquinas?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default MaquinasList;
