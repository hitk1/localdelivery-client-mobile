import React from 'react'
import { Keyboard } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { TextInput } from 'react-native-gesture-handler'

import { eInitialRouteNames, InitialScreenProps } from '@/routes/initialScreens/routes.config'

import {
    ScreenContainer,
    Input,
    PrimaryButton,
    SecondaryButton,
    PasswordInput
} from '@/components'

import {
    BackgroundScreen,
    ButtonWrapper,
    ComponentWrapper,
    LoginForm
} from './styles'
import { normalizeInputValue } from '@/common/utils'
import { useAuth } from '@/hooks/auth'
import { ApiCommomError } from '@/common/validations/apiErrors'
import { loginSchema } from './schema'
import { getYupValidationErrors } from '@/common/validations/yupValidationError'

interface IFormData {
    email: string
    password: string
}

const SignIn: React.FC<InitialScreenProps> = ({ navigation }) => {
    const {
        signIn
    } = useAuth()

    const formRef = React.useRef<FormHandles>(null)
    const emailRef = React.useRef<TextInput>(null)
    const passwordRef = React.useRef<TextInput>(null)

    const [isSubmiting, setSubmiting] = React.useState(false)

    const handleSubmit = async (data: IFormData) => {
        const formatedData: IFormData = normalizeInputValue<IFormData>(data)
        try {
            await loginSchema.validate(formatedData, { abortEarly: false })

            setSubmiting(true)

            await signIn(formatedData.email, formatedData.password)
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getYupValidationErrors(error))
                return
            }

            if (error instanceof ApiCommomError) {
                const {
                    errorCode
                } = error

                if (errorCode === 'not_found') {
                    Toast.show({
                        text1: 'Erro',
                        text2: 'Usuário não cadastrado',
                        type: 'info'
                    })

                    return
                }

                if (errorCode === 'unauthorized') {
                    Toast.show({
                        text1: 'Atenção',
                        text2: 'Usuário ou senha inválidos',
                        type: 'info'
                    })

                    return
                }
            }
        } finally {
            setSubmiting(false)
        }
    }

    const handleOnboarding = React.useCallback(() =>
        navigation.navigate(eInitialRouteNames.ONBOARDING),
        [navigation]
    )

    const submitForm = React.useCallback(() =>
        formRef.current?.submitForm()
        , [formRef])


    const handleFocus = React.useCallback((inputRef: React.RefObject<{ name: string }>) => {
        const errors = formRef.current?.getErrors()
        if (errors) {
            delete errors[inputRef.current?.name as string]
            formRef.current?.setErrors(errors as any)
        }
    }, [])

    return (
        <ScreenContainer>
            <BackgroundScreen
                onPress={Keyboard.dismiss}
            >
                <ComponentWrapper>
                    <LoginForm
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            ref={emailRef}
                            name='email'
                            label="Email"
                            placeholder='Insira seu email'
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="next"
                            keyboardType='email-address'
                            maxLength={200}
                            disabled={isSubmiting}
                            onFocus={() => handleFocus(emailRef)}
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                        <PasswordInput
                            ref={passwordRef}
                            name='password'
                            label="Password"
                            placeholder="Insira sua senha"
                            autoCorrect={false}
                            autoCapitalize='none'
                            returnKeyType="next"
                            keyboardType='name-phone-pad'
                            maxLength={20}
                            disabled={isSubmiting}
                            onFocus={() => handleFocus(passwordRef)}
                            onSubmitEditing={submitForm}
                        />
                    </LoginForm>
                    <ButtonWrapper>
                        <SecondaryButton
                            onPress={submitForm}
                            label="Entrar"
                        />
                        <PrimaryButton
                            onPress={handleOnboarding}
                            label="Criar Conta"
                            style={{
                                marginTop: 12
                            }}
                        />
                    </ButtonWrapper>
                </ComponentWrapper>
            </BackgroundScreen>
        </ScreenContainer>
    )
}

export { SignIn }