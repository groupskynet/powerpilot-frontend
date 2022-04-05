import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const OperadoresServices = {};

OperadoresServices.get = async (pageNumber) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/operadores?page=${pageNumber}`
  );
  return data;
};

OperadoresServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    'http://localhost:8000/api/operadores',
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

OperadoresServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    `http://localhost:8000/api/operadores/${request.id}?_method=PUT`,
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

OperadoresServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/operadores/${id}`
  );
  return data;
};

export default OperadoresServices;
