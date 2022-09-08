import * as Yup from 'yup';

export const validationMantenimiento = Yup.object().shape({
  tipo: Yup.string().required('El tipo es requerido'),
  proveedor: Yup.object().required('El proveedor es requerido'),
  maquina: Yup.object().required('La maquina es requerida'),
  horometro: Yup.number().when('maquina', {
    is: (maquina) => maquina && maquina.horometro < Yup.ref('horometro'),
    then: 'El horometro no puede ser menor al de la maquina'
  }),
  descripcion: Yup.string().required('La descripcion es requerida'),
  modalidad: Yup.string().required('La modalidad es requerida'),
  costo: Yup.number().required('El valor es requerido'),
  soporte: Yup.mixed().when('edit', {
    is: (edit) => !edit,
    then: Yup.mixed().required('El soporte de la factura es requerido')
  })
});

export const initialData = {
  edit: false,
  tipo: '',
  proveedor: '',
  maquina: '',
  descripcion: '',
  modalidad: '',
  horometro: 0,
  costo: 0,
  soporte: ''
};
