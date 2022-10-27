import React from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/auth';

import Routes from './routes'
import theme from './theme/config'

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <Toast
          position='bottom'
        />
      </ThemeProvider>
    </>
  )
}
