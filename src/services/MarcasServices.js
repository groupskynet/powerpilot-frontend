import axios from 'axios';

const MarcasServices = {};

MarcasServices.get = async (pageNumber) => {
  const { data } = await axios.get(`marcas?page=${pageNumber}`);
  return data;
};

MarcasServices.all = async () => {
  const { data } = await axios.get('marcas/all');
  return data;
};

MarcasServices.post = async (request) => {
  const { data } = await axios.post('marcas', request);
  return data;
};

MarcasServices.update = async (request) => {
  const { data } = await axios.put(`marcas/${request.id}`, request);
  return data;
};

MarcasServices.delete = async (id) => {
  const { data } = await axios.delete(`marcas/${id}`);
  return data;
};

export default MarcasServices;
