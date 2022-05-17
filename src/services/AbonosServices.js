import axios from 'axios';

const AbonosServices = {};

AbonosServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/abonos');
  return data;
};

AbonosServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/abonos',
    request
  );
  return data;
};

export default AbonosServices;
