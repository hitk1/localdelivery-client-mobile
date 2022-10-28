import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email obrigatório'),
    password: Yup.string().required('Senha obrigatória')
})