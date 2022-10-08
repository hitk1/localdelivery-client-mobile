import React from 'react'
import { Keyboard } from 'react-native'
import { FormHandles } from '@unform/core'

import {
    ScreenContainer,
    Input,
    PrimaryButton,
    SecondaryButton
} from '@/components'

import {
    BackgroundScreen,
    ButtonWrapper,
    LoginForm
} from './styles'

const SignIn: React.FC = () => {
    const formRef = React.useRef<FormHandles>(null)

    const handleSubmit = () => {

        console.log('submitted')
    }

    const submitForm = React.useCallback(() =>
        formRef.current?.submitForm()
        , [formRef])

    return (
        <BackgroundScreen
            onPress={Keyboard.dismiss}
        >
            <ScreenContainer>
                <LoginForm
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Input
                        name='email'
                        label="Email"
                    />
                    <Input
                        name='password'
                        label="Password"
                    />
                </LoginForm>
                <ButtonWrapper>
                    <PrimaryButton
                        onPress={submitForm}
                        label="Criar Conta"
                    />
                    <SecondaryButton
                        onPress={() => { }}
                        label="Entrar"
                        style={{
                            marginTop: 12
                        }}
                    />
                </ButtonWrapper>
            </ScreenContainer>
        </BackgroundScreen>
    )
}

export { SignIn }