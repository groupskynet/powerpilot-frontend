import axios from 'axios';

const MaquinaServices = {};

MaquinaServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/marcas');
  return data;
};

MaquinaServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/maquinas',
    request
  );
  return data;
};

MaquinaServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api//maquinas${request.id}`,
    request
  );
  return data;
};
MaquinaServices.delete = async (request) => {
  const { data } = await axios.delete(
    `http://localhost:/api/maquinas/${request.id}`,
    request
  );
  return data;
};

export default MaquinaServices;
