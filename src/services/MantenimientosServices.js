import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const MantenimientosServices = {};

MantenimientosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/mantenimientos');
  return data;
};

MantenimientosServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    'http://localhost:8000/api/mantenimientos',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        type: 'formData'
      }
    }
  );
  return data;
};

MantenimientosServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.put(
    `http://localhost:8000/api/mantenimientos/${request.id}`,
    formData,
    {
      headers: {
        'Content-Type': 'miltipart/form-data',
        type: 'formData'
      }
    }
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
