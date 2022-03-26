import * as Yup from 'yup';

const validationOrdenServicio = Yup.object().shape({
  cliente: Yup.number().required('El cliente es requerido'),
  maquina: Yup.number().required('La maquina es requerida'),
  accesorio: Yup.number(),
  horometroInicial: Yup.string().required('El horometro inicial es requerido'),
  horasPromedio: Yup.string().required('Las horas promedio son requeridas'),
  valorXhora: Yup.string().required('El valor por hora es requerido'),
  pagare: Yup.mixed().required('El pagare es requerido'),
  descuento: Yup.string()
});

export default validationOrdenServicio;
