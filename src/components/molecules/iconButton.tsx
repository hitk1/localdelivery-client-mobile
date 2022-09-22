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
import Pressable, { PressableProps } from '../atoms/pressable'
import { defaultHitslops } from '@/common/constants'

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
    Icon: any
    iconSize?: string
    iconColor?: string
}

const IconButton = ({
    containerProps,
    Icon,
    iconSize = '26px',
    iconColor = '#171a21',
    onPress,
    ...rest
}: React.PropsWithChildren<Props>) => {
    let props

    if (containerProps)
        props = useRestyle(restyleFunctions, containerProps)

    return (
        //@ts-ignore
        <Pressable
            onPress={onPress}
            height={26}
            width={26}
            hitSlop={defaultHitslops}
            {...props}
        >
            <Icon size={iconSize} color={iconColor} />
        </Pressable>
    )
}

export default IconButton