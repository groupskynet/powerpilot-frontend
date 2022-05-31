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
import AsignacionesServices from '../../services/AsigancionesServices';

function AsignacionesList() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Asignaciones', url: '/gestion/asignaciones' }
    ],
    []
  );

  const columns = useMemo(
    () => ['Operador', 'Maquina', 'Fecha', 'Acciones'],
    []
  );

  async function fetchData(pageNumber = 1) {
    try {
      setLoading(true);
      const response = await AsignacionesServices.get(pageNumber);
      if (response.status === 200) {
        setAsignaciones(response.data);
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
          <h2 className="font-semibold text-gray-800 flex-grow">
            Asignaciones
          </h2>
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
          {asignaciones?.data?.length &&
            asignaciones?.data?.map((item) => (
              <tr key={item.id}>
                <td>{}</td>
                <td> {}</td>
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
          totalCount={asignaciones?.total ? asignaciones?.total : 0}
          currentPage={
            asignaciones?.current_page ? asignaciones?.current_page : 0
          }
          pageSize={asignaciones?.per_page ? asignaciones?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default AsignacionesList;
