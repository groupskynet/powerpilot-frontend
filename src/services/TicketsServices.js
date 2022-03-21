import axios from 'axios';

const TicketsServices = {};

TicketsServices.get = async () => {
  const { data } = await axios.get('http://localhost:8000/api/tickets');
  return data;
};

TicketsServices.post = async (request) => {
  const { data } = await axios.post(
    'http://localhost:8000/api/tickets',
    request
  );
  return data;
};

TicketsServices.update = async (request) => {
  const { data } = await axios.put(
    `http://localhost:8000/api/tickets/${request.id}`,
    request
  );
  return data;
};

TicketsServices.delete = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:8000/api/tickets/${id}`
  );
  return data;
};

export default TicketsServices;
