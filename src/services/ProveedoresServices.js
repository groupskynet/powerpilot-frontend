import axios from 'axios';

const ProveedoresServices = {};

ProveedoresServices.get = async () => {
  const { data } = await axios.get('proveedores');
  return data;
};

ProveedoresServices.post = async (request) => {
  const { data } = await axios.post('proveedores', request);
  return data;
};

ProveedoresServices.update = async (request) => {
  const { data } = await axios.put(`proveedores/${request.id}`, request);
  return data;
};

ProveedoresServices.delete = async (id) => {
  const { data } = await axios.delete(`proveedores/${id}`);
  return data;
};

export default ProveedoresServices;
