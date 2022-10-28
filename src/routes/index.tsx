import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { useAuth } from '@/hooks/auth'
import { OnboardingContext } from '../hooks'
import { AppRoutes } from './homeScreens/homeScreens.routes'
import { AuthRoutes } from './initialScreens/initialScreens.routes'

const Routes: React.FC = () => {
    const { token } = useAuth()
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const event = setTimeout(() => setLoading(false), 1000)

        return () => clearTimeout(event)
    }, [])

    if (loading)
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#9c0000" />
            </View>
        )

    return (
        token
            ? <AppRoutes />
            : <OnboardingContext>
                <AuthRoutes />
            </OnboardingContext>
    )
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Routes