import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const TicketsServices = {};

TicketsServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/tickets');
  return data;
};

TicketsServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    'http://localhost:8000/api/tickets',
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

TicketsServices.file = async (path) => {
  const { data } = await axios.post('http://localhost:8000/api/file', { path });
  return data;
};

TicketsServices.update = async (id) => {
  const { data } = await axios.post(
    `http://localhost:8000/api/tickets/${id}?_method=PUT`
  );
  return data;
};

TicketsServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/tickets/${id}`
  );
  return data;
};

export default TicketsServices;
