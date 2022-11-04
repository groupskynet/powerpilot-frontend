import * as Yup from 'yup';

const validationMaquina = Yup.object().shape({
  horometro: Yup.number().when('edit', {
    is: (edit) => !edit,
    then: Yup.number().required('El horometro es requerido')
  }),
  tipo: Yup.string().required('El tipo de vehiculo'),
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.number().required('La marca es requerida'),
  prefijo: Yup.string().required('El prefijo es requerido'),
  modelo: Yup.number().required('El modelo es requerido'),
  serie: Yup.string().required('La serie es requerida'),
  linea: Yup.string().required('La linea es requerida'),
  registro: Yup.string().required('El numero de registro es requerido'),
  placa: Yup.string().when('tipo', {
    is: (tipo) => tipo === 'VEHICULO',
    then: Yup.string().required('La placa es requerida')
  })
});

export default validationMaquina;
