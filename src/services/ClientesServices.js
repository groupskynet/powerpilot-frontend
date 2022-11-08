import axios from 'axios';

const ClientesServices = {};

ClientesServices.get = async () => {
  const { data } = await axios.get('clientes');
  return data;
};

ClientesServices.post = async (request) => {
  const { data } = await axios.post('clientes', request);
  return data;
};

ClientesServices.update = async (request) => {
  const { data } = await axios.put(`clientes/${request.id}`, request);
  return data;
};

ClientesServices.delete = async (id) => {
  const { data } = await axios.delete(`clientes/${id}`);
  return data;
};

export default ClientesServices;
