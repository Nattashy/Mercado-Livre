import * as Yup from 'yup';

const loginValidator = Yup.object().shape({

    email: Yup.string()
        .email('E-mail inválido')
        .required('Digite um email'),

    senha: Yup.string()
        .required('Digite a senha')

})

export default loginValidator