import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const OrdenServicioServices = {};

OrdenServicioServices.get = async () => {
  const { data } = await axios.get('orden-servicio');
  return data;
};

OrdenServicioServices.find = async (id) => {
  const { data } = await axios.get(`orden-servicio/${id}`);
  return data;
};

OrdenServicioServices.buscarOrdenDeServicioActiva = async (id) => {
  const { data } = await axios.get(`orden/${id}`);
  return data;
};

OrdenServicioServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post('orden-servicio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      type: 'formData'
    }
  });
  return data;
};

OrdenServicioServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    `orden-servicio/${request.id}?_method=PUT`,
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

OrdenServicioServices.delete = async (id) => {
  const { data } = await axios.delete(`orden-servicio/${id}`);
  return data;
};

export default OrdenServicioServices;
