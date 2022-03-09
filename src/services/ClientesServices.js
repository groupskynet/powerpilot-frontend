import axios from 'axios';

const ClientesServices = {};

ClientesServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/clientes');
  return data;
};

ClientesServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/clientes',
    request
  );
  return data;
};

ClientesServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/clientes/${request.id}`,
    request
  );
  return data;
};

ClientesServices.delete = async (id) => {
  const { data } = await axios.delete(`http://localhost:/api/clientes/${id}`);
  return data;
};

export default ClientesServices;
