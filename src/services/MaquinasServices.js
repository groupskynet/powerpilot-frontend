import axios from 'axios';

const MaquinaServices = {};

MaquinaServices.get = async (pageNumber) => {
  const { data } = await axios.get(`maquinas?page=${pageNumber}`);
  return data;
};

MaquinaServices.asignar = async (request) => {
  const { data } = await axios.post('maquina/asignar', request);
  return data;
};

MaquinaServices.all = async () => {
  const { data } = await axios.all('maquinas/all');
  return data;
};

MaquinaServices.post = async (request) => {
  const { data } = await axios.post('maquinas', request);
  return data;
};

MaquinaServices.update = async (request) => {
  const { data } = await axios.put(`maquinas/${request.id}`, request);
  return data;
};
MaquinaServices.delete = async (id) => {
  const { data } = await axios.delete(`maquinas/${id}`);
  return data;
};

export default MaquinaServices;
