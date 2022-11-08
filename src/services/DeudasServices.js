import axios from 'axios';

const DeudasServices = {};

DeudasServices.get = async (pageNumber) => {
  const { data } = await axios.get(`deudas?page=${pageNumber}`);
  return data;
};

DeudasServices.all = async () => {
  const { data } = await axios.get('literales/deudas/all');
  return data;
};

DeudasServices.post = async (request) => {
  const { data } = await axios.post('deudas', request);
  return data;
};

DeudasServices.update = async (request) => {
  const { data } = await axios.put(`deudas/${request.id}`, request);
  return data;
};

export default DeudasServices;
