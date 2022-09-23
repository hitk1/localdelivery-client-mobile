import React from 'react'
import { Box } from '@/components/atoms'
import { TextInput } from '@/components/molecules'

const OnboardingStep1 = () => {

    return (
        <Box>
            <TextInput
                name='name'
                label='Nome'
            />
        </Box>
    )
}

export default OnboardingStep1