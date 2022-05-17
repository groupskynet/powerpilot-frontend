import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton
} from '@chakra-ui/react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import ButtonEdit from '../../components/ButtonEdit';
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
    () => ['Proveedor', 'Valor', 'fecha', 'Acciones'],
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
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
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
                <td className="items-center">
                  <ButtonEdit />
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
