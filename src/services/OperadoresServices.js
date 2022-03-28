import axios from 'axios';

const OperadoresServices = {};

OperadoresServices.get = async (pageNumber) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/operadores?page=${pageNumber}`
  );
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
    `http://localhost:8000/api/operadores/${request.id}?_method=PUT`,
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
