import axios from 'axios';

const GastosServices = {};

GastosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/gastos');
  return data;
};

GastosServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/gastos',
    request
  );
  return data;
};

GastosServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/gastos/${request.id}`,
    request
  );
  return data;
};
GastosServices.delete = async (id) => {
  const { data } = await axios.delete(`http://localhost:8000/api/gastos/${id}`);
  return data;
};

export default GastosServices;
