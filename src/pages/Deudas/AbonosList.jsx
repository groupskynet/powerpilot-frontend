import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton
} from '@chakra-ui/react';
import dateFormat, { masks } from 'dateformat';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonView from '../../components/ButtonView';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import AbonosServices from '../../services/AbonosServices';

function AbonosList() {
  const [abonos, setAbonos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Abonos', url: '/movimientos/deudas/abonos' }
    ],
    []
  );

  const columns = useMemo(
    () => ['Proveedor', 'Valor', 'Fecha', 'Acciones'],
    []
  );

  async function fetchData(pageNumber = 1) {
    try {
      setLoading(true);
      const response = await AbonosServices.get(pageNumber);
      if (response.status === 200) {
        setAbonos(response.data);
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
          <h2 className="font-semibold text-gray-800 flex-grow">Abonos</h2>
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
        <Table columns={columns} title="Abonos">
          {abonos?.data?.length &&
            abonos?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.proveedor.nombres}</td>
                <td>
                  {' '}
                  {item.valor.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
                </td>
                <td>{dateFormat(item.created_at, 'dd mmmm yyyy')}</td>
                <td className="items justify-center">
                  <ButtonView />
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            fetchData(pageNumber);
          }}
          totalCount={abonos?.total ? abonos?.total : 0}
          currentPage={abonos?.current_page ? abonos?.current_page : 0}
          pageSize={abonos?.per_page ? abonos?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default AbonosList;
