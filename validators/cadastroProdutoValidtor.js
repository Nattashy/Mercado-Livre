import * as Yup from 'yup';

const cadastroProdutoValidar = Yup.object().shape({
    nome: Yup.string()
        .min(3, 'Valor muito curto')
        .max(50, 'Valor muito grande')
        .required('Campo obrigatório'),

    valor: Yup.number()
        .required('Campo obrigatório'),

    url:  Yup.string()
        .required('Campo obrigatório'),

})

export default cadastroProdutoValidar