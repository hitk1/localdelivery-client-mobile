import React from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'

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
    FormWrapper
} from './styles'

const onboardingStepsDescription = [
    'Dados cadastrais',
    'Endereço',
    'Senha'
]

const Onboarding: React.FC<InitialScreenProps> = ({ navigation }) => {
    const [step, setStep] = React.useState(1)

    const handleGoBack = React.useCallback(() =>
        navigation.goBack(),
        [navigation]
    )

    return (
        <TouchableWithoutFeedback>
            <ScreenContainer>
                <Header
                    title='Registrar'
                    backButtonAction={handleGoBack}
                />

                <StepsInfo>
                    <Text>{step} de 3</Text>
                    <StepDescription>{onboardingStepsDescription[step - 1]}</StepDescription>
                </StepsInfo>

                <FormWrapper>
                    {step === 1 && <BasicData />}
                </FormWrapper>
            </ScreenContainer>
        </TouchableWithoutFeedback>
    )
}

export { Onboarding }