import * as Yup from 'yup'

export const addressDataSchema = Yup.object().shape({
    address: Yup.string()
        .required('Endereço é obrigatório'),
    number: Yup.string(),
    neighborhood: Yup.string()
        .required('O bairro é obrigatório'),
    complement: Yup.string(),
    zip_code: Yup.string()
        .length(8, 'O cep deve conter 8 caracteres')
        .required('O cep é obrigatório'),
    address_alias: Yup.string(),
})