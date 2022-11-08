import axios from 'axios';

const AsignacionesServices = {};

AsignacionesServices.get = async () => {
  const { data } = await axios.get('asignaciones');
  return data;
};

AsignacionesServices.post = async (request) => {
  const { data } = await axios.post('asignaciones', request);
  return data;
};

export default AsignacionesServices;
