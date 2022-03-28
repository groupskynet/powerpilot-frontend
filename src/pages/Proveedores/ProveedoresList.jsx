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
import ProveedorCreateOrUpdateModal from './ProveedorCreateOrUpdateModal';
import DeleteModal from '../Shared/DeleteModal';
import ProveedoresServices from '../../services/ProveedoresServices';

function ProveedoresList() {
  const proveedorModal = useModal(ProveedorCreateOrUpdateModal);
  const deleteModal = useModal(DeleteModal);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Proveedores', url: '/movimientos/proveedores' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      'TIpo',
      'Cedula/Nit',
      'Nombres/Razon Social',
      'Telefono',
      'Direccion',
      'Email',
      'Acciones'
    ],
    []
  );

  const handleNewProveedor = useCallback(() => {
    proveedorModal.show().then((newProveedor) => {
      setInfo({ type: 'success', message: 'Proveedor Creado Correctamente' });
      setProveedores((state) => ({
        ...state,
        data: [newProveedor, ...state.data]
      }));
    });
  }, [proveedorModal]);

  const handleEditProveedor = useCallback(
    (proveedor) => {
      proveedorModal.show({ proveedor }).then((newProveedor) => {
        setProveedores((state) => {
          const i = state.data.findIndex((m) => m.id === newProveedor.id);
          const updated = { ...state.data[i], ...newProveedor };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
        setInfo({
          type: 'success',
          message: 'Proveedor Actualizado Correctamente'
        });
      });
    },
    [proveedorModal]
  );

  const handleDeleteProveedor = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await ProveedoresServices.delete(id);
          if (response.status === 200) {
            setProveedores((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Proveedor Eliminado Correctamente'
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
      const response = await ProveedoresServices.get(pageNumber);
      if (response.status === 200) {
        setProveedores(response.data);
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
          <h2 className="font-semibold text-gray-800 flex-grow">Proveedores</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewProveedor();
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
          {proveedores?.data?.length &&
            proveedores?.data?.map((item) => (
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
                  <ButtonView onClick={() => {}} />
                  <ButtonEdit
                    onClick={() => {
                      handleEditProveedor(item);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteProveedor(item.id);
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
          totalCount={proveedores?.total ? proveedores?.total : 0}
          currentPage={proveedores?.currentPage ? proveedores?.currentPage : 0}
          pageSize={proveedores?.per_page ? proveedores?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default ProveedoresList;
