import { Box, Stack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BreadCrumbs from '../../components/ BreadCrumbs';
import Info from '../../components/Info';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import Table from '../../components/Table';
import MaquinaServices from '../../services/MaquinasServices';
import ArrowDown from './Components/ArrowDown';
import ArrowRight from './Components/ArrowRight';
import ArrowUp from './Components/ArrowUp';
import { OnlyLetter } from '../../utils/stringConversions';
import PagosServices from '../../services/PagosServices';

function Pagos() {
  const [maquinas, setMaquinas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [actives, setAcitves] = useState([]);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Dashboard', url: '/dashboard' },
      {
        title: 'Configuración Tabla de Pagos',
        url: '/configuracion/pagos'
      }
    ],
    []
  );

  const fetchData = useCallback(async (pageNumber = 1) => {
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
  }, []);

  const fetchSubmit = useCallback(async (id, value, type = 'maquina') => {
    if (type === 'maquina') {
      await PagosServices.maquina({ id, value });
      return;
    }
    await PagosServices.accesorio({ id, value });
  }, []);

  const handleOnChangeMaquina = useCallback(async (id, value) => {
    try {
      setLoading(true);
      const number = OnlyLetter(value);
      setMaquinas((state) => {
        const data = state.data.map((i) => {
          if (i.id === id) {
            return {
              ...i,
              pagos: [{ ...i.pagos[0], valor: number }]
            };
          }
          return i;
        });
        return { state, data: [...data] };
      });
    } catch (e) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentalo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOnBlurMaquina = useCallback(
    async (id, value) => {
      try {
        setLoading(true);
        await fetchSubmit(id, value, 'maquina');
        setMaquinas((state) => {
          const data = state.data.map((i) => {
            if (i.id === id) {
              return {
                ...i,
                pagos: [{ ...i.pagos[0], valor: value }]
              };
            }
            return i;
          });
          return { state, data: [...data] };
        });
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentalo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchSubmit]
  );

  const handleOnChangeAccesorio = useCallback(async (id, value) => {
    try {
      setLoading(true);
      const number = OnlyLetter(value);
      setMaquinas((state) => {
        const data = state.data.map((item) => {
          const accesorios = item.accesorios.map((accesorio) => {
            if (accesorio.id === id) {
              return {
                ...accesorio,
                pagos: [{ ...accesorio.pagos[0], valor: number }]
              };
            }
            return accesorio;
          });
          return { ...item, accesorios };
        });
        return { state, data: [...data] };
      });
    } catch (e) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentalo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOnBlurAccesorio = useCallback(
    async (id, value) => {
      try {
        setLoading(true);
        await fetchSubmit(id, value, 'accesorio');
        const number = OnlyLetter(value);
        setMaquinas((state) => {
          const data = state.data.map((item) => {
            const accesorios = item.accesorios.map((accesorio) => {
              if (accesorio.id === id) {
                return {
                  ...accesorio,
                  pagos: [{ ...accesorio.pagos[0], valor: number }]
                };
              }
              return accesorio;
            });
            return { ...item, accesorios };
          });
          return { state, data: [...data] };
        });
      } catch (e) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentalo más tarde.'
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchSubmit]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isActive = (id) => actives.findIndex((item) => item === id) !== -1;

  return (
    <Box>
      <BreadCrumbs items={breadCrumbs} />
      <Box>
        <div className="w-full mt-5 mx-auto bg-white rounded-lg">
          <h2 className="font-semibold text-gray-800 flex-grow">
            Table de Pagos
          </h2>
          <p className="mt-2 font-light italic">
            Configure el valor de pago por hora para cada maquina o asesorio,
            clickea cada celda para que se desplegen los asesorios de cada
            maquina.
          </p>
        </div>
        {info && (
          <Info
            type={info.type}
            message={info.message}
            onClose={() => {
              setInfo(null);
            }}
          />
        )}
        {loading && <Loading />}
        {!loading && (
          <Box marginTop={5}>
            <Table
              columns={['TIPO', 'SERIE', 'MAQUINA', 'OPERADOR', 'VALOR X HORA']}
            >
              {maquinas &&
                maquinas.data.map((item) => (
                  <>
                    <tr
                      key={item.id}
                      className="cursor-pointer font-sans border-b-2"
                    >
                      <td
                        role="gridcell"
                        onClick={() => {
                          if (item.accesorios.length === 0) return;
                          setAcitves((state) => {
                            const exist =
                              state.findIndex((i) => i === item.id) !== -1;
                            if (exist)
                              return state.filter((i) => i !== item.id);
                            return [...state, item.id];
                          });
                        }}
                      >
                        {item.accesorios.length > 0 && (
                          <Stack direction="row" spacing={2}>
                            {isActive(item.id) ? <ArrowUp /> : <ArrowDown />}
                            <p>{item.tipo}</p>
                          </Stack>
                        )}
                        {item.accesorios.length === 0 && (
                          <Stack direction="row" spacing={2}>
                            <ArrowRight />
                            <p>{item.tipo}</p>
                          </Stack>
                        )}
                      </td>
                      <td>{item.serie}</td>
                      <td>{item.nombre}</td>
                      <td>
                        {item.operador ? item.operador.nombres : 'SIN ASIGNAR'}
                      </td>
                      <td>
                        <input
                          data-input-id={item.id}
                          className="border border-gray-400 rounded p-1"
                          type="text"
                          value={
                            item.pagos.length > 0 ? item.pagos[0].valor : 0
                          }
                          onChange={(event) => {
                            const { value } = event.target;
                            handleOnChangeMaquina(item.id, value);
                          }}
                          onKeyUpCapture={(event) => {
                            if (event.key === 'Enter') {
                              handleOnBlurMaquina(item.id, event.target.value);
                            }
                          }}
                          onBlur={(event) =>
                            handleOnBlurMaquina(item.id, event.target.value)
                          }
                          placeholder="valor"
                        />
                      </td>
                    </tr>
                    <tr
                      id={item.id}
                      className={`${!isActive(item.id) ? 'hidden' : ''}`}
                    >
                      <td colSpan={5}>
                        <Box padding={2} width="100%">
                          <table className="w-full">
                            <thead className="text-left">
                              <th>NOMBRE</th>
                              <th>MARCA</th>
                              <th>MODELO</th>
                              <th>SERIE</th>
                              <th>VALOR X HORA</th>
                            </thead>
                            {item.accesorios &&
                              item.accesorios.map((asesorio) => (
                                <tr key={asesorio.id}>
                                  <td>{asesorio.nombre}</td>
                                  <td>{asesorio.marca.nombre}</td>
                                  <td>{asesorio.modelo}</td>
                                  <td>{asesorio.serie}</td>
                                  <td>
                                    <input
                                      className="border border-gray-400 rounded p-1"
                                      type="text"
                                      value={
                                        asesorio.pagos.length > 0
                                          ? asesorio.pagos[0].valor
                                          : 0
                                      }
                                      onChange={(event) => {
                                        const { value } = event.target;
                                        handleOnChangeAccesorio(
                                          asesorio.id,
                                          value
                                        );
                                      }}
                                      onKeyUpCapture={(event) => {
                                        if (event.key === 'Enter') {
                                          handleOnBlurAccesorio(
                                            asesorio.id,
                                            event.target.value
                                          );
                                        }
                                      }}
                                      onBlur={(event) =>
                                        handleOnBlurAccesorio(
                                          asesorio.id,
                                          event.target.value
                                        )
                                      }
                                      placeholder="valor"
                                    />
                                  </td>
                                </tr>
                              ))}
                          </table>
                        </Box>
                      </td>
                    </tr>
                  </>
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
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Pagos;
