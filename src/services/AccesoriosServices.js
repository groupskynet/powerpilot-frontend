import axios from 'axios';

const AccesoriosServices = {};

AccesoriosServices.get = async () => {
  const { data } = await axios.get('accesorios');
  return data;
};

AccesoriosServices.post = async (request) => {
  const { data } = await axios.post('accesorios', request);
  return data;
};

AccesoriosServices.update = async (request) => {
  const { data } = await axios.put(`accesorios/${request.id}`, request);
  return data;
};

AccesoriosServices.delete = async (id) => {
  const { data } = await axios.delete(`accesorios/${id}`);
  return data;
};

export default AccesoriosServices;
