import React from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import UiArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left'

import { Box, Container, Text } from '@/components/atoms'
import { StackScreenProps } from '@/common/navigators/routes-params'
import { IconButton } from '@/components/molecules'

export default function OnboardingScreen({ navigation }: StackScreenProps) {

    const handleGoBack = React.useCallback(() => navigation.goBack(), [])

    return (
        <Container
            mx='md'
        >
            <Box
                width="100%"
                height={46}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                style={{
                    marginTop: getStatusBarHeight() + 15
                }}
            >
                <IconButton
                    onPress={handleGoBack}
                    Icon={UiArrowLeft}
                />
                <Box alignSelf="center">
                    <Text variant="headerText">Registro de Conta</Text>
                </Box>
            </Box>
        </Container>
    )
}