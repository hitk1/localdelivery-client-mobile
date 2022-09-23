import React from 'react'

import { Box, Container, Text } from '@/components/atoms'
import { StackScreenProps } from '@/common/navigators/routes-params'
import { Header } from '@/components/molecules'
import { ScrollView } from 'react-native-gesture-handler'

import { OnboardingStep1 } from './components/'

export default function OnboardingScreen({ navigation }: StackScreenProps) {
    const [steps, setSteps] = React.useState(1)
    const [subtitle, setSubtitle] = React.useState('Dados básicos')

    const handleGoBack = React.useCallback(() => navigation.goBack(), [])

    return (
        <Container mx='md'>
            <Header
                title="Registro de conta"
                onPress={handleGoBack}
            />
            <Box
                marginTop="md"
                marginLeft="md"
            >
                <Text>{steps} de 3</Text>
                <Text
                    marginTop="sm"
                    fontWeight="bold"
                    fontSize={18}
                >
                    {subtitle}
                </Text>
            </Box>
            <ScrollView
                contentInsetAdjustmentBehavior='automatic'
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {steps === 1 && <OnboardingStep1 />}
            </ScrollView>
        </Container>
    )
}