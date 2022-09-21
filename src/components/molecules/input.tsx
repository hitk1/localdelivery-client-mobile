import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useController } from 'react-hook-form'
import {
    useRestyle,
    spacing,
    border,
    backgroundColor,
    SpacingProps,
    BorderProps,
    BackgroundColorProps,
    composeRestyleFunctions
} from '@shopify/restyle'
import Box, { BoxProps } from '../atoms/box'
import Text from '../atoms/text'
import { Theme } from '@/themes'

type InputProps = {
    required?: boolean
    label: string
    name: string
    filled?: boolean
    disabled?: boolean
    inputProps?: TextInputProps
    containerProps?: BoxProps & SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>
}

const restyleFunctions = composeRestyleFunctions<Theme, BoxProps & SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>>([
    spacing,
    border,
    backgroundColor
])

export default function Input({
    name,
    label,
    required,
    filled,
    disabled,
    containerProps,
    inputProps,
    ...rest
}: InputProps) {
    const {
        field: { onChange, onBlur, value },
        fieldState: { error }
    } = useController({ name })

    const [isFilled, setFilled] = React.useState(value !== null && value !== '')
    const [isFocused, setFocused] = React.useState(false)
    const props = useRestyle(restyleFunctions, { ...containerProps })

    const handleOnChange = React.useCallback((rawText: string) => {
        setFilled(rawText !== '')
        onChange(rawText)
    }, [isFilled, onChange])

    const handleOnFocus = React.useCallback((value: boolean) => {
        setFocused(value)

        if (!value)
            onBlur()
    }, [onBlur])

    return (
        <Box
            width="100%"
            {...props as any}
        >
            <Text>{label} {required && '*'}</Text>
            <Box
                mt='xs'
                px="sm"
                height={46}
                borderWidth={1}
                borderRadius='sm'
                justifyContent="center"
                borderColor={isFocused || isFilled ? '$inputFilled' : '$inputEmpty'}
            >
                <TextInput
                    value={value}
                    onChangeText={handleOnChange}
                    onFocus={() => handleOnFocus(true)}
                    onBlur={() => handleOnFocus(false)}
                    accessibilityRole='text'
                    {...inputProps}
                />
            </Box>
        </Box>
    )
}