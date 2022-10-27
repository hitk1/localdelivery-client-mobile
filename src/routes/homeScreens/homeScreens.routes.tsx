import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import { eAppRoutesNames } from './routes.config'
import { Home } from '@/screens/Home'

const Stack = createStackNavigator()

export const AppRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={eAppRoutesNames.HOME}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name={eAppRoutesNames.HOME}
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
