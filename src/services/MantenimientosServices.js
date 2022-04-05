import axios from 'axios';

const MantenimientosServices = {};

MantenimientosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/mantenimientos');
  return data;
};

MantenimientosServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/mantenimientos',
    request
  );
  return data;
};

MantenimientosServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/mantenimientos/${request.id}`,
    request
  );
  return data;
};

MantenimientosServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/mantenimientos/${id}`
  );
  return data;
};

export default MantenimientosServices;
