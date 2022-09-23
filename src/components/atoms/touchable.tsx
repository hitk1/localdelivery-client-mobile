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
    composeRestyleFunctions,
    useRestyle,
    LayoutProps,
    layout
} from '@shopify/restyle'
import { Theme } from '@/themes'
import Pressable, { PressableProps } from './pressable'

type RestyleProps = BackgroundColorProps<Theme> &
    BorderProps<Theme> &
    OpacityProps<Theme> &
    SpacingProps<Theme> &
    SpacingShorthandProps<Theme> &
    LayoutProps<Theme>

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
    backgroundColor,
    opacity,
    border,
    spacing,
    spacingShorthand,
    layout
])

interface Props extends PressableProps {
    containerProps?: RestyleProps
}

const Touchable = ({
    containerProps,
    children,
    onPress,
    ...rest
}: React.PropsWithChildren<Props>) => {
    let props

    if (containerProps)
        props = useRestyle(restyleFunctions, containerProps)

    return (
        //@ts-ignore
        <Pressable {...props} onPress={onPress}>
            {children}
        </Pressable>
    )
}

export default Touchable