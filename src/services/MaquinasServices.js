import axios from 'axios';

const MaquinaServices = {};

MaquinaServices.get = async (pageNumber) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/maquinas?page=${pageNumber}`
  );
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
    `http://localhost:8000/api/maquinas/${request.id}`,
    request
  );
  return data;
};
MaquinaServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/maquinas/${id}`
  );
  return data;
};

export default MaquinaServices;
