import * as Yup from 'yup';

export const validationTicket = Yup.object().shape({
  nOrden: Yup.number().integer().required('El numero de orden es requirda'),
  operador: Yup.number().integer().required('El operador es requerido'),
  cliente: Yup.object().required('El cliente es requerido'),
  maquina: Yup.object().required('la maquina es requerido'),
  accesorio: Yup.number().when('accesorios', (accesorios) => {
    if (accesorios && accesorios.length > 0)
      return Yup.number().integer().required('El accesorio es requerido');
  }),
  fecha: Yup.date().required('la fecha es requerida'),
  horometroInicial: Yup.number().required('El nombre es requerido'),
  horometroFinal: Yup.number()
    .min(
      Yup.ref('horometroInicial'),
      'El Horometro Final no puede ser menor o igual al Horometro Inicial'
    )
    .required(),
  soporte: Yup.mixed().required('El soporte es requerido'),
  galones: Yup.number().when('tieneCombustible', (tieneCombustible) => {
    if (tieneCombustible)
      return Yup.number().required('La cantidad de galones es requerida');
  }),
  costo: Yup.number().when('tieneCombustible', (tieneCombustible) => {
    if (tieneCombustible) return Yup.number().required('El costo es requerido');
  }),
  factura: Yup.number().when('tieneCombustible', (tieneCombustible) => {
    if (tieneCombustible)
      return Yup.mixed().required(
        'La factura de la compra de combustible es requerida'
      );
  })
});

export const initialData = {
  operador: '',
  fecha: '',
  maquina: '',
  accesorio: '',
  tieneCombustible: false,
  horometroInicial: 0,
  horometroFinal: 0,
  galones: 0,
  costo: 0,
  soporte: '',
  accesorios: [],
  factura: ''
};
