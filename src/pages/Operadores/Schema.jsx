import * as Yup from 'yup';

const validationOperadores = Yup.object().shape({
  nombres: Yup.string().required('Los nombres son requeridos'),
  apellidos: Yup.string().required('Los apellidos son requeridos'),
  cedula: Yup.number().required('La cédula es requerida'),
  telefono1: Yup.number().required('El telefono es requerido'),
  telefono2: Yup.number(),
  licencia: Yup.mixed().required('La Licencia es requerida'),
  direccion: Yup.string().required('La Dirección es requerida'),
  email: Yup.string().required('El email es requerido')
});

export default validationOperadores;
