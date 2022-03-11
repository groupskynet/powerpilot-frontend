import * as Yup from 'yup';

const validationAccesorio = Yup.object().shape({
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.number().required('La marca es requerida'),
  modelo: Yup.string().required('El modelo es requerido'),
  Serie: Yup.string().required('La serie es requerida'),
  linea: Yup.string().required('La linea es requerida'),
  registro: Yup.string().required('El numero de registro es requerido'),
  maquina: Yup.number().required('El numero de registro es requerido')
});

export default validationAccesorio;
