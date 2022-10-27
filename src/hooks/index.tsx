import React from 'react'

import { OnboardingProvider } from './onboarding'

type Props = {
    children: React.ReactNode
}

const OnboardingContext = ({ children }: Props) => (
    <OnboardingProvider>
        {children}
    </OnboardingProvider>
)

export {
    OnboardingContext
}