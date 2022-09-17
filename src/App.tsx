import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle'

import defaultTheme from './themes/light'

import Screens from './screens'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider theme={defaultTheme}>
          <StatusBar
            backgroundColor='transparent'
            translucent 
            animated
          />
          <Screens />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
