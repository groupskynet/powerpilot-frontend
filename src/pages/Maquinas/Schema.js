import * as Yup from 'yup';

const validationMaquina = Yup.object().shape({
  horometro: Yup.number().when('edit', (edit) => {
    if (!edit) {
      return Yup.number().required('El horometro es requerido');
    }
  }),
  tipo: Yup.string().required('El tipo de vehiculo'),
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.number().required('La marca es requerida'),
  modelo: Yup.number().required('El modelo es requerido'),
  serie: Yup.string().required('La serie es requerida'),
  linea: Yup.string().required('La linea es requerida'),
  registro: Yup.string().required('El numero de registro es requerido'),
  placa: Yup.string().when('tipo', (tipo) => {
    if (tipo === 'VEHICULO')
      return Yup.string().required('La placa es requerida');
  })
});

export default validationMaquina;