import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Input
} from '@chakra-ui/react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import BreadCrumbs from '../../components/ BreadCrumbs';
import LiteralesServices from '../../services/LiteralesServices';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination/Pagination';
import ReporteHorometroServices from '../../services/ReporteHorometroService';

function ReporteHorometro() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    maquina: '',
    fechaInicio: '',
    fechaFinal: ''
  });
  const [tickets, setTickets] = useState(null);
  const [totales, setTotales] = useState({
    total: 0,
    combustible: 0,
    horas_por_dia: 0
  });
  const [accesorios, setAccesorios] = useState([]);
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
      'Combustible',
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

  const handleSubmit = useCallback(async (values, page = 1) => {
    try {
      setLoading(true);
      const response = await ReporteHorometroServices.horometro(
        {
          ...values,
          maquina_id: values.maquina.id
        },
        page
      );
      if (response.status === 200) {
        setTickets(response.tickets);
        setTotales(response.totales);
        setAccesorios(response.accesorios);
        setFilters(values);
        return;
      }
      setInfo({
        type: 'error',
        message:
          'se ha producido un error, por favor intente nuevamente más tarde.'
      });
    } catch (e) {
      setInfo({
        type: 'error',
        message:
          'se ha producido un error, por favor intenta nuevamente más tarde.'
      });
    } finally {
      setLoading(false);
    }
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
      <Formik
        enableReinitialize
        initialValues={filters}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
                        value={formik.values.maquina}
                        onChange={(maquina) => {
                          formik.setFieldValue('maquina', maquina);
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
                </label>
                <Input
                  name="fechaInicio"
                  type="date"
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/4 ml-4">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-fecha-fin"
                >
                  Fecha Fin
                </label>
                <Input
                  name="fechaFinal"
                  type="date"
                  value={formik.values.fechaFinal}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="w-1/4 ml-4 pt-5 pl-4" display="flex">
                <Button type="submit" colorScheme="blue">
                  Buscar
                </Button>
              </div>
            </Box>
          </form>
        )}
      </Formik>
      <Box marginY={4}>
        <Table columns={columns} title="a">
          {tickets &&
            tickets.data &&
            tickets.data.map((item) => (
              <tr>
                <td>{`ORD-${String(item.id).padStart(4, '0')}`}</td>
                <td>{item.consecutivo}</td>
                <td>{item.fecha}</td>
                <td>{item.accesorio ? item.accesorio.nombre : 'N/A'}</td>
                <td>{item.galones * item.costo}</td>
                <td>{item.horometroInicial}</td>
                <td>{item.horometroFinal}</td>
                <td>{Math.abs(item.horometroFinal - item.horometroInicial)}</td>
                <td>{new Intl.NumberFormat().format(item.valor_por_hora_orden)}</td>
                <td>
                  {new Intl.NumberFormat().format(
                    (item.horometroFinal - item.horometroInicial) *
                      item.valor_por_hora_orden
                  )}
                </td>
              </tr>
            ))}
        </Table>
        <Pagination
          onPageChange={(pageNumber) => {
            handleSubmit(filters, pageNumber);
          }}
          totalCount={tickets?.total ? tickets?.total : 0}
          currentPage={tickets?.current_page ? tickets?.current_page : 0}
          pageSize={tickets?.per_page ? tickets?.per_page : 0}
        />
      </Box>
      <Box display="flex" borderRadius="md">
        {accesorios.length > 0 && (
          <div className="w-1/3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-horas-accesorio"
            >
              Horas Por Accesorio
            </label>
            {accesorios.map((item) => (
              <div>
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-balde"
                >
                  {item.accesorio} : {item.horas}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="w-1/3">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-promedio-combustible"
          >
            {`Total : $ ${new Intl.NumberFormat().format(totales.total)}`}
          </label>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-promedio-horas"
            >
              {`Promedio de combustible : $ ${new Intl.NumberFormat().format(
                totales.combustible
              )}`}
            </label>
          </div>
          <div>
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-promedio-horas"
            >
              {`Promedio de Horas por Días : ${totales.horas_por_dia}`}
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
