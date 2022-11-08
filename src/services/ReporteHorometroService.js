import axios from 'axios';

const ReporteHorometroServices = {};

ReporteHorometroServices.horometro = async (request, page) => {
  const { data } = await axios.post(
    `http://localhost:8000/api/reportes/horometro?page=${page}`,
    request
  );
  return data;
};

export default ReporteHorometroServices;
