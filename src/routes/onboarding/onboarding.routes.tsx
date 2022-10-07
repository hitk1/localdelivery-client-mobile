import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { eOnboardingRouteNames } from './route.names'

import { SignIn } from '../../screens/onboarding/SignIn'

const Stack = createStackNavigator()

export const AuthRoutes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={eOnboardingRouteNames.SIGN_IN}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={eOnboardingRouteNames.SIGN_IN}
                    component={SignIn}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}