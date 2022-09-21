import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um email válido')
        .required('O email é obrigatório'),
    password: Yup.string()
    .required('A senha é obrigatória')
})