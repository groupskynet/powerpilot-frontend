import axios from 'axios';

const MaquinaServices = {};

MaquinaServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/maquinas');
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
<<<<<<< HEAD
  const { data } = await axios.delete(`http://localhost:/api/maquinas/${id}`);
=======
  const { data } = await axios.delete(
    `http://localhost:8000/api/maquinas/${id}`
  );
>>>>>>> 8b4a98c3fa9098abef643436727191d15c600adf
  return data;
};

export default MaquinaServices;
