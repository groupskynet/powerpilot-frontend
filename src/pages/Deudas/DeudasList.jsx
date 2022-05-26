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
import ButtonView from '../../components/ButtonView';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import DeudasServices from '../../services/DeudasServices';
import AbonoCreateOrUpdateModal from './AbonosCreateOrUpdateModal';

function DeudasList() {
  const abonoModal = useModal(AbonoCreateOrUpdateModal);
  const [deudas, setDeudas] = useState([]);
  const [abonos, setAbono] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Deudas', url: '/movimientos/deudas' }
    ],
    []
  );

  const columns = useMemo(() => ['Proveedor', 'Valor', 'Acciones'], []);

  const handleNewAbono = useCallback(() => {
    abonoModal.show().then((newAbono) => {
      setInfo({ type: 'success', message: 'Abono Creado Correctamente' });
      setAbono((state) => ({ ...state, data: [newAbono, ...state.data] }));
    });
  }, [abonoModal]);

  async function fetchData(pageNumber = 1) {
    try {
      setLoading(true);
      const response = await DeudasServices.get(pageNumber);
      if (response.status === 200) {
        setDeudas(response.data);
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
          <h2 className="font-semibold text-gray-800 flex-grow">Deudas</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewAbono();
              }}
            >
              Abonar
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
        <Table columns={columns} title="Deudas">
          {deudas?.data?.length &&
            deudas?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.mantenimiento.proveedor.nombres}</td>
                <td>
                  {(
                    item.mantenimiento.costo - item.mantenimiento.abono
                  ).toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
                </td>
                <td className="items justify-center">
                  <ButtonView />
                  <ButtonDelete />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={deudas?.total ? deudas?.total : 0}
          currentPage={deudas?.current_page ? deudas?.current_page : 0}
          pageSize={deudas?.per_page ? deudas?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default DeudasList;
