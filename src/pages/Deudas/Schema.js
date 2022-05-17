import * as Yup from 'yup';

const validationAbonos = Yup.object().shape({
  proveedor: Yup.string().required('El proveedor es requerido'),
  valor: Yup.string().required('El valor es requerido')
});

export default validationAbonos;
