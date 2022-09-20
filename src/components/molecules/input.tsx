import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native'
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
    const [text, setText] = React.useState('')
    const [isFilled, setFilled] = React.useState(text !== '')
    const [isFocused, setFocused] = React.useState(false)
    const props = useRestyle(restyleFunctions, { ...containerProps })

    const handleOnChange = (rawText: string) => {
        setText(rawText)
        setFilled(rawText !== '')
    }

    const handleOnFocus = (value: boolean) => setFocused(value)

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
                    value={text}
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