import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { eInitialRouteNames } from './routes.config'


import { SignIn } from '../../screens/onboarding/SignIn'
import { Onboarding } from '@/screens/onboarding/Onboarding'

const Stack = createNativeStackNavigator()

export const AuthRoutes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={eInitialRouteNames.SIGN_IN}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={eInitialRouteNames.SIGN_IN}
                    component={SignIn}
                />
                <Stack.Screen
                    name={eInitialRouteNames.ONBOARDING}
                    component={Onboarding}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}