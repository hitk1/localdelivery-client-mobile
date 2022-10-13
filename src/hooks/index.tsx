import React from 'react'

import { OnboardingProvider } from './onboarding'

type Props = {
    children: React.ReactNode
}

const HooksProvider = ({ children }: Props) => (
    <OnboardingProvider>
        {children}
    </OnboardingProvider>
)

export default HooksProvider