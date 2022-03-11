import axios from 'axios';

const AccesoriosServices = {};

AccesoriosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/accesorios');
  return data;
};

AccesoriosServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/accesorios',
    request
  );
  return data;
};

AccesoriosServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/accesorios/${request.id}`,
    request
  );
  return data;
};

AccesoriosServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/accesorios/${id}`
  );
  return data;
};

export default AccesoriosServices;
