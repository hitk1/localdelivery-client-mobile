import React from 'react'
import { Keyboard } from 'react-native'
import { FormHandles } from '@unform/core'
import { useNavigation } from '@react-navigation/native'

import { eInitialRouteNames, InitialScreenProps } from '@/routes/initialScreens/routes.config'

import {
    ScreenContainer,
    Input,
    PrimaryButton,
    SecondaryButton
} from '@/components'

import {
    BackgroundScreen,
    ButtonWrapper,
    ComponentWrapper,
    LoginForm
} from './styles'

const SignIn: React.FC<InitialScreenProps> = ({ navigation }) => {
    const formRef = React.useRef<FormHandles>(null)

    const handleSubmit = () => {

        console.log('submitted')
    }

    const handleOnboarding = React.useCallback(() =>
        navigation.navigate(eInitialRouteNames.ONBOARDING),
        [navigation]
    )

    const submitForm = React.useCallback(() =>
        formRef.current?.submitForm()
        , [formRef])

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
                            name='email'
                            label="Email"
                        />
                        <Input
                            name='password'
                            label="Password"
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