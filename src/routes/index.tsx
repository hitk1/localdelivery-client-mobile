import { useAuth } from '@/hooks/auth'
import React from 'react'

import { OnboardingContext } from '../hooks'
import { AppRoutes } from './homeScreens/homeScreens.routes'
import { AuthRoutes } from './initialScreens/initialScreens.routes'

const Routes: React.FC = () => {
    const {
        user
    } = useAuth()

    console.log(user)

    return (
        user
            ? <AppRoutes />
            : <OnboardingContext>
                <AuthRoutes />
            </OnboardingContext>
    )
}

export default Routes