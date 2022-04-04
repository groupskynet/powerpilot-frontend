import * as Yup from 'yup';

export const validationOrdenServicio = Yup.object().shape({
  cliente: Yup.object().required('El cliente es requerido'),
  maquina: Yup.object().required('La maquina es requerida'),
  horometroInicial: Yup.number().required('El horometro inicial es requerido'),
  horasPromedio: Yup.number().required('Las horas promedio son requeridas'),
  valorXhora: Yup.number().required('El valor por hora es requerido'),
  pagare: Yup.mixed().when('edit', (edit) => {
    if (!edit) {
      return Yup.mixed().required('el pagare es requerido');
    }
  }),
  valorIda: Yup.number().required('El valor de Ida es requerido'),
  valorVuelta: Yup.number().when('horasPromedio', (horasPromedio) => {
    if (horasPromedio < 100) {
      return Yup.number().required('el valor de vuelta es requerido');
    }
  }),
  accesorios: Yup.array().min(1, 'Debes Ingresar por lo menos un accesorio')
});

export const initialData = {
  edit: false,
  cliente: '',
  maquina: '',
  horometroInicial: 0,
  horasPromedio: 0,
  accesorios: [],
  valorXhora: 0,
  pagare: '',
  valorVuelta: '',
  valorIda: ''
};
