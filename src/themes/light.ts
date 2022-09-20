import { createTheme } from '@shopify/restyle'
import { StatusBarStyle } from 'react-native'

const pallet = {
    white: 'white',
    black: 'black',
    red: 'red',
    paper00: '#ffffff',
    paper10: '#f5f5f4',
    paper20: '#e6e6e6',
    paper300: '#767577',
    paper900: '#202020',
    blue70: '#2185d0',
    navy20: '#171a21',
    navy900: '#b9babc',
}

const theme = createTheme({
    spacing: {
        '0': 0,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 48,
        hg: 128
    },
    breakpoints: {
        phone: 0,
        tablet: 768
    },
    colors: {
        white: pallet.white,
        black: pallet.black,
        red: pallet.red,
        $primary: '#9c0000',
        $windowBackground: '#f0f0f0',
        $background: pallet.paper10,
        $foreground: pallet.paper900,
        $sidebarBackground: pallet.navy20,
        $sidebarForeground: pallet.navy900,
        $sidebarSeparator: pallet.paper00 + '20',
        $headerBarBackground: pallet.paper20,
        $inputEmpty: pallet.paper300,
        $inputFilled: pallet.paper900,
    },
    borderRadii: {
        xs: 4,
        sm: 16,
        md: 24,
        lg: 64,
        hg: 128
    },
    statusBar: {
        barStyle: 'dark-content' as StatusBarStyle
    },
    textVariants: {
        defaults: {
            color: '$foreground',
            fontSize: 16
        },
        sidebar: {
            color: '$sidebarForeground'
        }
    },
    barVariants: {
        headerBar: {
            bg: '$headerBarBackground',
            borderRadius: 'hg'
        }
    }
})

export default theme

export type Theme = typeof theme