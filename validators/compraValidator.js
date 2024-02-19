import * as Yup from 'yup';

const compraValidator = Yup.object().shape({
    logradouro: Yup.string()
        .required('Campo obrigatório'),

    bairro: Yup.string()
        .required('Campo obrigatório'),

    localidade: Yup.string()
        .required('Campo obrigatório'),

    cep: Yup.string()
        .required('Campo obrigatório')
        .min(9, 'Valor muito curto'),


    numero: Yup.string()
        .required('Campo obrigatório')



})

export default compraValidator