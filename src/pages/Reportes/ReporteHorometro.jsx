import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton
} from '@chakra-ui/react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../components/ BreadCrumbs';
import LiteralesServices from '../../services/LiteralesServices';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination/Pagination';

function ReporteHorometro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState([]);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Reportes', url: '/reportes' },
      { title: 'Reporte Horometro', url: '/reportes/horometro' }
    ],
    []
  );
  const columns = useMemo(
    () => [
      'Orden de Servicio',
      'Ticket #',
      'Fecha',
      'Accesorio',
      'Horometro Inicial',
      'Horometro Final',
      'Total Horas',
      'Valor X Hora',
      'Subtotal'
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respMaquinas = await LiteralesServices.get({ model: 'maquinas' });
        if (respMaquinas.status === 200) setMaquinas(respMaquinas.data);
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'Se ha producido un error, por favor intentelo más tarde'
        });
      }
    }

    fetch();
  }, []);

  if (loading) return <Loading />;

  return (
    <Box>
      <BreadCrumbs items={breadCrumbs} />

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
      <Box display="flex" alignItems="center" borderRadius="md">
        <div className="w-1/4 ">
          <Box display="flex" alignItems="end">
            <Box flexGrow={1}>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-maquina"
              >
                Maquina
              </label>
              {maquinas && (
                <Select
                  id="maquina"
                  options={maquinas}
                  getOptionLabel={(maquina) => maquina && maquina.nombre}
                  getOptionValue={(maquina) => maquina && maquina.id}
                  value={maquinas.filter((maquina) => maquina.id)}
                  onChange={(maquina) => {
                    maquina.setFieldValue('maquina', maquina);
                  }}
                />
              )}
            </Box>
          </Box>
        </div>
        <div className="w-1/4 ml-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-fecha-inicio"
          >
            Fecha Inicio
          </label>{' '}
          {maquinas && (
            <Select
              id="maquina"
              options={maquinas}
              getOptionLabel={(maquina) => maquina && maquina.nombre}
              getOptionValue={(maquina) => maquina && maquina.id}
              value={maquinas.filter((maquina) => maquina.id)}
              onChange={(maquina) => {
                maquina.setFieldValue('maquina', maquina);
              }}
            />
          )}
        </div>
        <div className="w-1/4 ml-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-fecha-fin"
          >
            Fecha Fin
          </label>
          {maquinas && (
            <Select
              id="maquina"
              options={maquinas}
              getOptionLabel={(maquina) => maquina && maquina.nombre}
              getOptionValue={(maquina) => maquina && maquina.id}
              value={maquinas.filter((maquina) => maquina.id)}
              onChange={(maquina) => {
                maquina.setFieldValue('maquina', maquina);
              }}
            />
          )}
        </div>
        <div className="w-1/4 ml-4 pt-5 pl-4" display="flex">
          <Button type="button" colorScheme="blue" onClick={() => {}}>
            Buscar
          </Button>
        </div>
      </Box>
      <Box marginY={4}>
        <Table columns={columns} title="a">
          <tr>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
        </Table>
        <Pagination />
      </Box>
      <Box display="flex" alignItems="center" borderRadius="md">
        <div className="w-1/3">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-horas-accesorio"
          >
            Horas Por Accesorio
          </label>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-balde"
            >
              Balde :
            </label>
          </div>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-martillo"
            >
              Martillo :
            </label>
          </div>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-martillo"
            >
              Total Horas :
            </label>
          </div>
        </div>{' '}
        <div className="w-1/3">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-horas-accesorio"
          >
            Valores
          </label>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-balde"
            >
              Hora Balde :
            </label>
          </div>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-martillo"
            >
              Hora Martillo :
            </label>
          </div>
        </div>
        <div className="w-1/3">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-promedio-combustible"
          >
            Total $ :
          </label>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-promedio-horas"
            >
              Promedio de combustible :
            </label>
          </div>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-promedio-horas"
            >
              Promedio de Horas por Días :
            </label>
          </div>
        </div>
      </Box>
      <Box display="flex" justifyContent="end">
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={() => {
            navigate('/movimientos/mantenimiento');
          }}
        >
          Salir
        </button>
      </Box>
    </Box>
  );
}

export default ReporteHorometro;