import * as Yup from 'yup';

const validationAsignacion = Yup.object().shape({
  maquina: Yup.number().required('La Máquina es requerida'),
  operador: Yup.number().required('El operador es requerido')
});

export default validationAsignacion;
