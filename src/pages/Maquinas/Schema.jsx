import * as Yup from 'yup';

const validationMaquina = Yup.object().shape({
  tipo: Yup.string().required('El tipo de vehiculo'),
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.number().required('La marca es requerida'),
  modelo: Yup.string().required('El modelo es requerido'),
  serie: Yup.string().required('La serie es requerida'),
  linea: Yup.string().required('La linea es requerida'),
  registry: Yup.string().required('El numero de registro es requerido'),
  placa: Yup.string().when('tipo', (tipo) => {
    if (tipo === 'VEHICULO')
      return Yup.string().required('La placa es requerida');
  })
});

export default validationMaquina;
