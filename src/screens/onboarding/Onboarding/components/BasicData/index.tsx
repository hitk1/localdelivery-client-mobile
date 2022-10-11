import React from 'react'
import * as Yup from 'yup'
import { TextInput } from 'react-native-gesture-handler'
import { FormHandles } from '@unform/core'

import { Input, PrimaryButton } from '@/components'

import {
    OnboardingForm
} from './styles'
import { basicDataSchema } from './schema'
import { getYupValidationErrors } from '@/common/validations/yupValidationError'

interface IFormData {
    name: string
    email: string
    phone_number: string
}

const BasicData: React.FC<any> = () => {
    const formRef = React.useRef<FormHandles>(null)
    const nameRef = React.useRef<TextInput>(null)
    const emailRef = React.useRef<TextInput>(null)
    const phoneRef = React.useRef<TextInput>(null)

    const submitForm = React.useCallback(() =>
        formRef.current?.submitForm()
        , [formRef])

    const onSubmit = React.useCallback(async (data: IFormData) => {
        formRef.current?.setErrors({})

        console.log(data)

        try {
            await basicDataSchema.validate(
                data,
                { abortEarly: false }
            )
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getYupValidationErrors(error))
                return
            }
        }
    }, [])

    const handleFocus = React.useCallback((inputRef: React.RefObject<{name: string}>) => {
        const errors = formRef.current?.getErrors()

        if(errors){
            delete errors[inputRef.current?.name as string]
            formRef.current?.setErrors(errors as any)
        }
     }, [])

    return (
        <OnboardingForm
            ref={formRef}
            onSubmit={onSubmit}
        >
            <Input
                ref={nameRef}
                name="name"
                label="Nome"
                placeholder='Insira seu nome'
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType='next'
                keyboardType='name-phone-pad'
                maxLength={300}
                onFocus={() => handleFocus(nameRef)}
                onSubmitEditing={() => emailRef.current?.focus()}
            />
            <Input
            ref={emailRef}
                name="email"
                label="Email"
                placeholder='Insira seu email'
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType='next'
                keyboardType='email-address'
                maxLength={200}
                onFocus={() => handleFocus(emailRef)}
                onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <Input
                ref={phoneRef}
                name="phone_number"
                label='Telefone'
                placeholder='Insira seu telefone'
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType='number-pad'
                maxLength={11}
                returnKeyType="send"
                onFocus={() => handleFocus(phoneRef)}
                onSubmitEditing={submitForm}
            />

            <PrimaryButton
                onPress={submitForm}
                label="Continuar"
                style={{
                    marginTop: 32
                }}
            />
        </OnboardingForm>
    )
}

export { BasicData }