import * as Yup from 'yup';

const validationMarca = Yup.object().shape({
  nombre: Yup.string().required('El nombre es requerido')
});

export default validationMarca;
