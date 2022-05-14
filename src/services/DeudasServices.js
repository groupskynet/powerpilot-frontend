import axios from 'axios';

const DeudasServices = {};

DeudasServices.get = async (pageNumber) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/deudas?page=${pageNumber}`
  );
  return data;
};

DeudasServices.all = async () => {
  const { data } = await axios.get(
    'http://localhost:8000/api/literales/deudas/all'
  );
  return data;
};

DeudasServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/deudas',
    request
  );
  return data;
};

DeudasServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/deudas/${request.id}`,
    request
  );
  return data;
};

export default DeudasServices;
