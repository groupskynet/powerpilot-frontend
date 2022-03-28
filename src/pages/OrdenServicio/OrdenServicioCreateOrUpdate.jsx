import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Select from 'react-select';
import BreadCrumbs from '../../components/ BreadCrumbs';
import LiteralesServices from '../../services/LiteralesServices';

function OrdenServicioCreateOrUpdate() {
  const [clientes, setClientes] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [info, setInfo] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Ordenes de Servicio', url: '/servicios/orden-servicio' },
      { title: 'Nueva Orden', url: '/servicios/orden-servicio/new' }
    ],
    []
  );

  useEffect(() => {
    async function fetch() {
      try {
        const respClientes = await LiteralesServices.get({ model: 'clientes' });
        if (respClientes.status === 200) setClientes(respClientes.data);
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

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <form className="rounded">
        <Box display="flex" alignItems="center" borderRadius="md">
          <div className="w-1/3">
            <Box display="flex" alignItems="end">
              <Box flexGrow={1}>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-registry"
                >
                  Cliente
                </label>
                <Select
                  id="cliente"
                  options={clientes}
                  getOptionLabel={(cliente) => cliente && cliente.nombres}
                  getOptionValue={(cliente) => cliente && cliente.id}
                  onChange={() => {}}
                />
              </Box>
              <Button backgroundColor="white" marginLeft={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Button>
            </Box>
          </div>
          <div className="w-1/3 mx-4">
            <Box display="flex" alignItems="end">
              <Box flexGrow={1}>
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-registry"
                >
                  Maquina
                </label>
                {maquinas && (
                  <Select
                    id="maquina"
                    options={maquinas}
                    getOptionLabel={(maquina) => maquina && maquina.nombre}
                    getOptionValue={(maquina) => maquina && maquina.id}
                  />
                )}
              </Box>
              <Button backgroundColor="white" marginLeft={2}>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
}

export default OrdenServicioCreateOrUpdate;
