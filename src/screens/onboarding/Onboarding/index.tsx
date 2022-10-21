import React from 'react'
import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback } from 'react-native'

import { InitialScreenProps } from '@/routes/initialScreens/routes.config'

import {
    BasicData,
} from './components/BasicData'

import {
    ScreenContainer,
    Header
} from '@/components'

import {
    StepsInfo,
    StepDescription,
    FormWrapper,
    KeyboardAvoid
} from './styles'
import { Address } from './components/Address'
import { PasswordRegister } from './components/Password'

const onboardingStepsDescription = [
    'Dados cadastrais',
    'Endereço',
    'Registro de senha'
]

const Onboarding: React.FC<InitialScreenProps> = ({ navigation }) => {
    const [step, setStep] = React.useState(1)

    const handleGoBack = React.useCallback(() =>
        navigation.goBack(),
        [navigation]
    )

    const handlePageChange = (page: number) => {
        setStep(page)
    }
    
    const handleFinish = () => {
        navigation.goBack()   
    }

    return (
        <ScreenContainer>
            <Header
                title='Registrar'
                backButtonAction={handleGoBack}
            />

            <StepsInfo>
                <Text>{step} de 3</Text>
                <StepDescription>{onboardingStepsDescription[step - 1]}</StepDescription>
            </StepsInfo>

            <KeyboardAvoid behavior='height'>
            <FormWrapper>
                {step === 1 && <BasicData
                    handlePageChange={() => handlePageChange(2)}
                />}
                {step === 2 && <Address
                    handlePageChange={() => handlePageChange(3)}
                />}
                {step === 3 && <PasswordRegister 
                    onFinish={handleFinish}
                />}
            </FormWrapper>
            </KeyboardAvoid>
        </ScreenContainer>
    )
}

export { Onboarding }