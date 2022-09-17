import React from 'react'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '@/themes'
import Box from './box'

const Container: React.FC<React.PropsWithChildren<BoxProps<Theme>>> = props => (
    <Box {...props} flex={1} backgroundColor="$background">
        {props.children}
    </Box>
)

export default Container