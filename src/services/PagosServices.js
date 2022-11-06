import axios from 'axios';

const PagosServices = {};

PagosServices.maquina = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/pagos/maquina',
    request
  );
  return data;
};

PagosServices.accesorio = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/pagos/accesorios',
    request
  );
  return data;
};

export default PagosServices;
