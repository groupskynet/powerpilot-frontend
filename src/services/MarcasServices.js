import axios from 'axios';

const MarcasServices = {};

MarcasServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/marcas');
  return data;
};

MarcasServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/marcas',
    request
  );
  return data;
};

MarcasServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/marcas/${request.id}`,
    request
  );
  return data;
};
MarcasServices.delete = async (request) => {
  const { data } = await axios.delete(
    `http://localhost:/api/marcas/${request.id}`,
    request
  );
  return data;
};

export default MarcasServices;
