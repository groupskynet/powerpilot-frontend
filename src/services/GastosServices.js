import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const GastosServices = {};

GastosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/gastos');
  return data;
};

GastosServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    'http://localhost:8000/api/gastos',
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

GastosServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    `http://localhost:8000/api/gastos/${request.id}?_method=PUT`,
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
GastosServices.delete = async (id) => {
  const { data } = await axios.delete(`http://localhost:8000/api/gastos/${id}`);
  return data;
};

export default GastosServices;
