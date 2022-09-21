import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Screens
import Login from './Login'
import Onboarding from './Onboarding'


const Stack = createNativeStackNavigator()

export default function Screens(){
    return(
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="Onboarding"
                component={Onboarding}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}