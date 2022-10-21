import React from 'react'
import { FormHandles } from '@unform/core'
import { TextInput } from 'react-native-gesture-handler'
import Icon from '@expo/vector-icons/Octicons'
import Toast from 'react-native-toast-message'
import { PasswordInput, PrimaryButton } from '@/components'

import {
    Container,
    OnboardingForm,
    PasswordMetadataContainer,
    RowContainer,
    Validation
} from './styles'
import { ApiService } from '@/services/api'
import { useOnboarding } from '@/hooks/onboarding'

interface IFormData {
    password: string
    repeat_password: string
}

interface IProps {
    onFinish: () => void
}

const PasswordRegister = ({ onFinish }: IProps) => {
    const {
        onboardingUserId,
        clearOnboarding
    } = useOnboarding()
    const api = new ApiService()
    const formRef = React.useRef<FormHandles>(null)

    const passwordRef = React.useRef<TextInput>(null)
    const repeatPasswordRef = React.useRef<TextInput>(null)

    const [isSubmitting, setSubmittting] = React.useState(false)
    const [isLengthValid, setLengthValid] = React.useState(false)
    const [isCapsValid, setCapsValid] = React.useState(false)
    const [isNumberValid, setNumberValid] = React.useState(false)

    const handleSubmit = React.useCallback(async (data: IFormData) => {
        const formatedData = {
            password: data.password.trim(),
            repeat_password: data.repeat_password.trim()
        }

        if (!isLengthValid || !isNumberValid || !isCapsValid) {
            Toast.show({
                text1: 'Atenção',
                text2: 'A senha fora do padrão de segurança',
                type: 'info'
            })
            return
        }

        if (formatedData.password !== formatedData.repeat_password) {
            formRef.current?.setErrors({
                repeat_password: 'Senha divergente'
            })

            Toast.show({
                text1: 'Senhas não conferem',
                type: 'error'
            })

            passwordRef.current?.focus()
            return
        }

        try {
            setSubmittting(true)

            await api.onboardingRegisterPassword({
                customer_id: onboardingUserId!,
                password: formatedData.password,
                repeat_password: formatedData.repeat_password
            })

            await clearOnboarding()

            Toast.show({
                text1: 'Sucesso ao criar conta'
            })

            onFinish()
        } catch (error) {
            
            console.log('Error on assign password')
            console.log(error.message)

            Toast.show({
                type: 'error',
                text1: 'Erro inesperado ao cadastrar endereço'
            })
        }

        setSubmittting(false)
    }, [
        isLengthValid,
        isNumberValid,
        isCapsValid,
        formRef,
        passwordRef,
        onboardingUserId,
        clearOnboarding,
        onFinish
    ])

    const handleFocus = React.useCallback((inputRef: React.RefObject<{ name: string }>) => {
        const errors = formRef.current?.getErrors()

        console.log(errors)
        if (errors) {
            delete errors[inputRef.current?.name as string]
            formRef.current?.setErrors(errors as any)
        }
    }, [formRef])

    const submitForm = React.useCallback(() => {
        formRef.current?.submitForm()
    }, [formRef])

    const handleChangePassword = (text: string) => {
        const formatedValue = text.trim()

        setNumberValid(/\d/.test(formatedValue))
        setCapsValid(/[A-Z]/.test(formatedValue))
        setLengthValid(/^[a-zA-Z0-9]{8,}$/.test(formatedValue))
    }

    return (
        <Container
            contentInsetAdjustmentBehavior='automatic'
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <OnboardingForm
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <PasswordInput
                    ref={passwordRef}
                    name="password"
                    label="Senha"
                    placeholder="Insira sua senha"
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType="next"
                    keyboardType='name-phone-pad'
                    maxLength={20}
                    disabled={isSubmitting}
                    onChangeText={handleChangePassword}
                    onFocus={() => handleFocus(passwordRef)}
                    onSubmitEditing={() => repeatPasswordRef.current?.focus()}
                />

                <PasswordInput
                    ref={repeatPasswordRef}
                    name="repeat_password"
                    label="Repetir senha"
                    placeholder="Repita sua senha"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType='send'
                    keyboardType='name-phone-pad'
                    maxLength={20}
                    disabled={isSubmitting}
                    onFocus={() => handleFocus(repeatPasswordRef)}
                    onSubmitEditing={submitForm}
                />
            </OnboardingForm>
            <PasswordMetadataContainer>
                <RowContainer>
                    <Icon
                        name={isLengthValid ? 'shield-check' : 'shield'}
                        size={22}
                        color={isLengthValid ? 'green' : 'red'}
                    />
                    <Validation isValid={isLengthValid}>Pelo menos 8 caracteres</Validation>
                </RowContainer>
                <RowContainer
                    style={{
                        marginTop: 8
                    }}
                >
                    <Icon
                        name={isNumberValid ? 'shield-check' : 'shield'}
                        size={22}
                        color={isNumberValid ? 'green' : 'red'}
                    />
                    <Validation isValid={isNumberValid}>Pelo menos 1 número</Validation>
                </RowContainer>
                <RowContainer
                    style={{
                        marginTop: 8
                    }}
                >
                    <Icon
                        name={isCapsValid ? 'shield-check' : 'shield'}
                        size={22}
                        color={isCapsValid ? 'green' : 'red'}
                    />
                    <Validation isValid={isCapsValid}>Pelo menos 1 letra maiúscula</Validation>
                </RowContainer>
            </PasswordMetadataContainer>
            <PrimaryButton
                label='Criar Conta'
                onPress={submitForm}
                style={{
                    marginTop: 32
                }}
            />
        </Container>
    )
}

export { PasswordRegister }