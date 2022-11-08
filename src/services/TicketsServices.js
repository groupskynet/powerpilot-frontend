import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const TicketsServices = {};

TicketsServices.get = async () => {
  const { data } = await axios.get('tickets');
  return data;
};

TicketsServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post('tickets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      type: 'formData'
    }
  });
  return data;
};

TicketsServices.file = async (path) => {
  const { data } = await axios.post('file', { path });
  return data;
};

TicketsServices.update = async (id) => {
  const { data } = await axios.post(`tickets/${id}?_method=PUT`);
  return data;
};

TicketsServices.delete = async (id) => {
  const { data } = await axios.delete(`tickets/${id}`);
  return data;
};

export default TicketsServices;
