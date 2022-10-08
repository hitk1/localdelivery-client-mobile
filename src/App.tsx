import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import Routes from './routes'
import theme from './theme/config'

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />
        <Routes />
      </ThemeProvider>
    </>
  )
}
