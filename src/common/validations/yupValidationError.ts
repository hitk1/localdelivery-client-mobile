import { ValidationError } from 'yup'

interface IValidationError {
    [key: string]: string
}

export const getYupValidationErrors = (errors: ValidationError) => {
    let existingErrors: IValidationError = {}

    errors.inner.forEach(item => existingErrors[item.path!] = item.message )

    return existingErrors
}