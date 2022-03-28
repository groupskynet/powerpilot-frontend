import axios from 'axios';

const ProveedoresServices = {};

ProveedoresServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/proveedores');
  return data;
};

ProveedoresServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/proveedores',
    request
  );
  return data;
};

ProveedoresServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/proveedores/${request.id}`,
    request
  );
  return data;
};

ProveedoresServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/proveedores/${id}`
  );
  return data;
};

export default ProveedoresServices;
