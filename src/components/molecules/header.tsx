import * as React from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import UiArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left'

import { Box, Text } from '../atoms'
import IconButton from './iconButton'

interface Props {
    title: string
    onPress: () => void
}

const Header = ({ 
    title,
    onPress
}: Props) => {

    return (
        <Box
            width="100%"
            height={46}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            style={{
                marginTop: getStatusBarHeight() + 15
            }}
        >
            <Box
                position="absolute"
                left={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
            >
                <IconButton
                    onPress={onPress}
                    Icon={UiArrowLeft}
                />
            </Box>
            <Box>
                <Text variant="headerText">{title}</Text>
            </Box>
        </Box>
    )
}

export default Header