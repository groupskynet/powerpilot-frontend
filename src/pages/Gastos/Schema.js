import * as Yup from 'yup';

const validationGastos = Yup.object().shape({
  maquina: Yup.string().required('La Maquina es requerida'),
  valor: Yup.string().required('El valor es requerido'),
  descripcion: Yup.string().required('La descripción es requerida'),
  soporte: Yup.mixed().required('El soporte es requerido')
});

export default validationGastos;
