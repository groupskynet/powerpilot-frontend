import axios from 'axios';

const MarcasServices = {};

MarcasServices.get = async (pageNumber) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/marcas?page=${pageNumber}`
  );
  return data;
};

MarcasServices.all = async () => {
  const { data } = await axios.all('http://localhost:8000/api/marcas/all');
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

MarcasServices.delete = async (id) => {
  const { data } = await axios.delete(`http://localhost:8000/api/marcas/${id}`);
  return data;
};

export default MarcasServices;
