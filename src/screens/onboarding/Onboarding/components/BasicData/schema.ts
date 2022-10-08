import * as Yup from 'yup'

export const basicDataSchema = Yup.object().shape({
    name: Yup.string()
        .required('O nome é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    phone_number: Yup.string()
        .required('O telefone é obrigatório')
})