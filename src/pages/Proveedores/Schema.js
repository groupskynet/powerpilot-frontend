import * as Yup from 'yup';

const validationProveedor = Yup.object().shape({
  tipo: Yup.string().required('El tipo es requerido'),
  nombres: Yup.string().required('El nombre es requerido'),
  cedula: Yup.number().required('La cédula es requerida'),
  direccion: Yup.string().required('La dirección es requerida'),
  email: Yup.string().required('La correo es requerido'),
  telefono: Yup.number().required('El telefono es requerido'),
  nit: Yup.string().when('tipo', (tipo) => {
    if (tipo === 'PERSONA JURIDICA')
      return Yup.string().required('El nit es requerido');
  }),
  razonSocial: Yup.string().when('tipo', (tipo) => {
    if (tipo === 'PERSONA JURIDICA')
      return Yup.string().required('La razón social es requerida');
  })
});

export default validationProveedor;
