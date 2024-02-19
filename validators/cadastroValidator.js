import * as Yup from 'yup';

const cadastroValidator = Yup.object().shape({
    nome: Yup.string()
        .min(10, 'Valor muito curto')
        .max(50, 'Valor muito grande')
        .required('Campo obrigatório'),

    email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),

    cpf: Yup.string()
        .min(14, 'Valor muito curto')
        .max(15, 'Valor muito grande')
        .required('Campo obrigatório'),

    telefone: Yup.string()
        .required('Campo obrigatório')
        .min(15, 'Valor muito curto'),

    senha: Yup.string()
        .required('Campo obrigatório')
        .min(6, 'Valor muito curto')

})

export default cadastroValidator