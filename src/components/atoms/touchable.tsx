import React from 'react'
import {
    backgroundColor,
    BackgroundColorProps,
    border,
    BorderProps,
    opacity,
    OpacityProps,
    SpacingProps,
    spacing,
    spacingShorthand,
    SpacingShorthandProps,
    createBox,
    composeRestyleFunctions,
    useRestyle
} from '@shopify/restyle'
import { Theme } from '@/themes'
import Text from './text'
import { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type RestyleProps = BackgroundColorProps<Theme> &
    BorderProps<Theme> &
    OpacityProps<Theme> &
    SpacingProps<Theme> &
    SpacingShorthandProps<Theme>

const Pressable = createBox<Theme, TouchableOpacityProps>(TouchableOpacity)
type PressableProps = React.ComponentProps<typeof Pressable>

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
    backgroundColor,
    opacity,
    border,
    spacing,
    spacingShorthand,
])

interface Props extends PressableProps {
    label: string
    actionType: 'primary' | 'secondary'
    containerProps?: RestyleProps
}

const Touchable = ({
    label,
    containerProps,
    actionType,
    ...rest
}: Props) => {
    let props

    if (containerProps)
        props = useRestyle(restyleFunctions, containerProps)

    return (
        //@ts-ignore
        <Pressable
            minWidth='100%'
            height={46}
            justifyContent="center"
            alignItems="center"
            bg={actionType === 'primary' ? '$primary' : 'white'}
            borderRadius='sm'
            {...rest}
            {...props}
        >
            <Text variant={actionType === 'primary' ? 'primaryButtonLabel' : 'primaryButtonLabel'}>{label}</Text>
        </Pressable>
    )
}

export default Touchable