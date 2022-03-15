import axios from 'axios';

const OperadoresServices = {};

OperadoresServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/operadores');
  return data;
};

OperadoresServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/operadores',
    request
  );
  return data;
};

OperadoresServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/operadores/${request.id}`,
    request
  );
  return data;
};

OperadoresServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/operadores/${id}`
  );
  return data;
};

export default OperadoresServices;
