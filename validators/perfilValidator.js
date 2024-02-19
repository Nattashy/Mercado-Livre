import * as Yup from 'yup';

const perfilValidator = Yup.object().shape({
  nome: Yup.string()
  .min(10, 'Valor muito curto.')
  .max(50, 'Valor muito grande.')
  .required('Campo obrigatório'),

conta: Yup.number()
.required('Campo obrigatório'),

endereco: Yup.number()
.required('Campo obrigatório'),

privacidade: Yup.string()
.required('Campo obrigatório'),

cartoes: Yup.string()
.required('Campo obrigatório'),
  })

export default perfilValidator