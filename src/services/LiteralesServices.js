import axios from 'axios';

const LiteralesServices = {};

LiteralesServices.get = async ({ model }) => {
  const { data } = await axios.get(
    `http://localhost:8000/api/literales/${model}/all`
  );
  return data;
};

export default LiteralesServices;
