import axios from 'axios';

const OrdenServicioServices = {};

OrdenServicioServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/ordenServicio');
  return data;
};

OrdenServicioServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/ordenServicio',
    request
  );
  return data;
};

OrdenServicioServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/ordenServicio/${request.id}`,
    request
  );
  return data;
};

OrdenServicioServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/ordenServicio/${id}`
  );
  return data;
};

export default OrdenServicioServices;
