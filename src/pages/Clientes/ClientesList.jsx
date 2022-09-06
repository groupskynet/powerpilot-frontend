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
import ButtonView from '../../components/ButtonView';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import ClienteCreateOrUpdateModal from './ClienteCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';
import ClientesServices from '../../services/ClientesServices';
import ClientViewModal from './ClienteViewModal';

function ClientesList() {
  const clienteModal = useModal(ClienteCreateOrUpdateModal);
  const modalViewClient = useModal(ClientViewModal);
  const deleteModal = useModal(DeleteModal);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Clientes', url: '/servicios/clientes' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'Tipo',
      'Cedula/Nit',
      'Nombres/Razon Social',
      'Telefono',
      'Direccion',
      'Email',
      'Acciones'
    ],
    []
  );

  const handleNewCliente = useCallback(() => {
    clienteModal.show().then((newCliente) => {
      setInfo({ type: 'success', message: 'Cliente Creado Correctamente' });
      setClientes((state) => ({ ...state, data: [newCliente, ...state.data] }));
    });
  }, [clienteModal]);

  const handleEditCliente = useCallback(
    (cliente) => {
      clienteModal.show({ cliente }).then((newCliente) => {
        setClientes((state) => {
          const i = state.data.findIndex((m) => m.id === newCliente.id);
          const updated = { ...state.data[i], ...newCliente };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
        setInfo({
          type: 'success',
          message: 'Cliente Actualizado Correctamente'
        });
      });
    },
    [clienteModal]
  );

  const handleViewClient = useCallback(
    (cliente) => {
      modalViewClient.show({ cliente }).then(() => {});
    },
    [modalViewClient]
  );

  const handleDeleteCliente = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await ClientesServices.delete(id);
          if (response.status === 200) {
            setClientes((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Cliente Eliminado Correctamente'
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
            message: 'se ha producido un error, por favor intentalo más tarde.'
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
      const response = await ClientesServices.get(pageNumber);
      if (response.status === 200) {
        setClientes(response.data);
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
          <h2 className="font-semibold text-gray-800 flex-grow">Clientes</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewCliente();
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
        <Table columns={columns} title="Clientes">
          {clientes?.data?.length &&
            clientes?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.tipo}</td>
                <td>
                  {new Intl.NumberFormat().format(
                    item.tipo === 'PERSONA JURIDICA' ? item.nit : item.cedula
                  )}
                </td>
                <td>
                  {item.tipo === 'PERSONA JURIDICA'
                    ? item.razonSocial
                    : item.nombres}
                </td>
                <td>{item.telefono}</td>
                <td>{item.direccion}</td>
                <td>{item.email}</td>
                <td className="flex items-center">
                  <ButtonView
                    onClick={() => {
                      handleViewClient(item);
                    }}
                  />
                  <ButtonEdit
                    onClick={() => {
                      handleEditCliente(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteCliente(item.id);
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
          totalCount={clientes?.total ? clientes?.total : 0}
          currentPage={clientes?.currentPage ? clientes?.currentPage : 0}
          pageSize={clientes?.per_page ? clientes?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default ClientesList;
