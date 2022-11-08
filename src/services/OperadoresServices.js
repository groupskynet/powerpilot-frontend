import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const OperadoresServices = {};

OperadoresServices.get = async (pageNumber) => {
  const { data } = await axios.get(`operadores?page=${pageNumber}`);
  return data;
};

OperadoresServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post('operadores', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      type: 'formData'
    }
  });
  return data;
};

OperadoresServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    `operadores/${request.id}?_method=PUT`,
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
  const { data } = await axios.delete(`operadores/${id}`);
  return data;
};

export default OperadoresServices;
