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
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination/Pagination';
import TicketsServices from '../../services/TicketsServices';
import TicketCreateOrUpdateModal from './TicketCreateOrUpdateModal';
import ButtonView from '../../components/ButtonView';
import ButtonCheck from '../../components/ButtonCheck';
import DeleteModal from '../Shared/DeleteModal';
import TicketViewModal from './TicketViewModal';

function TicketsList() {
  const modalTicket = useModal(TicketCreateOrUpdateModal);
  const modalViewTicket = useModal(TicketViewModal);
  const deleteModal = useModal(DeleteModal);
  const [info, setInfo] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Inicio', url: '/' },
      { title: 'Tickets', url: '/servicios/tickets' }
    ],
    []
  );

  const fetchData = useCallback(async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await TicketsServices.get(pageNumber);
      if (response.status === 200) {
        setTickets(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error,por favor intentelo más tarde.'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNewTicket = useCallback(() => {
    modalTicket.show().then((ticket) => {
      setInfo({ type: 'success', message: 'Ticket Creado Correctamente' });
      setTickets((state) => ({ ...state, data: [...state.data, ticket] }));
    });
  }, [modalTicket]);

  const handleViewTicket = useCallback(
    (ticket) => {
      modalViewTicket.show({ ticket }).then((newTicket) => {
        setTickets((state) => {
          const i = state.data.findIndex((t) => t.id === newTicket.id);
          const updated = { ...state.data[i], ...newTicket };
          const arr = [...state.data];
          arr.splice(i, 1, updated);
          return { ...state, data: arr };
        });
      });
    },
    [modalViewTicket]
  );

  const handleDeleteTicket = useCallback(
    (id) => {
      deleteModal.show().then(async () => {
        try {
          setLoading(true);
          const response = await TicketsServices.delete(id);
          if (response.status === 200) {
            setTickets(response.data);
            setInfo({
              type: 'success',
              message: 'Ticket Eliminado Correctamente'
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
            message: 'se ha producido un error,por favor intentelo más tarde.'
          });
        } finally {
          setLoading(false);
          deleteModal.remove();
        }
      });
    },
    [deleteModal]
  );

  const columns = useMemo(
    () => [
      '# TICKET',
      'OPERADOR',
      'MAQUINA',
      'ACCESORIO',
      'H.INICIAL',
      'H.FINAL',
      'FECHA',
      'ACCIONES'
    ],
    []
  );

  if (loading) return <Loading />;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <div className="w-full mt-5 mx-auto bg-white rounded-lg">
        <div className="px-5 py-4 flex items-center">
          <h2 className="font-semibold text-gray-800 flex-grow">Tickets</h2>
          <div className="flex">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleNewTicket();
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
        <Table columns={columns} title="Tickets">
          {tickets?.data?.length > 0 &&
            tickets?.data?.map((item) => (
              <tr
                className={`${
                  item.estado === 'PENDIENTE' ? 'text-red-500' : ''
                }`}
                key={item.id}
              >
                <td>{`${item.consecutivo}`}</td>
                <td>{`${item.operador.nombres} ${item.operador.apellidos}`}</td>
                <td>{item.maquina.nombre}</td>
                <td>
                  {item.accesorio ? item.accesorio.nombre : 'SIN ACCESORIO'}
                </td>
                <td>{item.horometroInicial}</td>
                <td>{item.horometroFinal}</td>
                <td>{item.fecha}</td>
                <td className="flex items-center ">
                  {item.estado === 'PENDIENTE' ? (
                    <ButtonCheck
                      onClick={() => {
                        handleViewTicket(item);
                      }}
                    />
                  ) : (
                    <ButtonView
                      onClick={() => {
                        handleViewTicket(item);
                      }}
                    />
                  )}

                  <ButtonDelete
                    onClick={() => {
                      handleDeleteTicket(item.id);
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
          totalCount={tickets?.total ? tickets?.total : 0}
          currentPage={tickets?.current_page ? tickets?.current_page : 0}
          pageSize={tickets?.per_page ? tickets?.per_page : 0}
        />
      </div>
    </div>
  );
}

export default TicketsList;
