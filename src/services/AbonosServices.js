import axios from 'axios';

const AbonosServices = {};

AbonosServices.get = async () => {
  const { data } = await axios.get('abonos');
  return data;
};

AbonosServices.post = async (request) => {
  const { data } = await axios.post('abonos', request);
  return data;
};

export default AbonosServices;
