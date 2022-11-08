import axios from 'axios';

const ReporteHorometroServices = {};

ReporteHorometroServices.horometro = async (request, page) => {
  const { data } = await axios.post(`reportes/horometro?page=${page}`, request);
  return data;
};

export default ReporteHorometroServices;
