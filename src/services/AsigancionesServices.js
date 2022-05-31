import axios from 'axios';

const AsignacionesServices = {};

AsignacionesServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/asignaciones');
  return data;
};

AsignacionesServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/asignaciones',
    request
  );
  return data;
};

export default AsignacionesServices;
