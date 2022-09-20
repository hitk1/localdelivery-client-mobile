import * as React from 'react'
import {
    useRestyle,
    spacing,
    border,
    backgroundColor,
    SpacingProps,
    BorderProps,
    BackgroundColorProps,
    composeRestyleFunctions,
} from '@shopify/restyle'
import { Box, Text } from '@/components/atoms'
import { BoxProps } from '../atoms/box'
import { Theme } from '@/themes'
import { TextInput } from 'react-native-gesture-handler'
import { TextInputProps, TouchableOpacity } from 'react-native'

type PasswordInputProps = Partial<TextInputProps> & {
    name: string
    label: string
    containerProps?: BoxProps & SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>
}

const restyleFunctions = composeRestyleFunctions<Theme, BoxProps & SpacingProps<Theme> & BorderProps<Theme> & BackgroundColorProps<Theme>>([
    spacing,
    border,
    backgroundColor
])

export default function PasswordInput({
    name,
    label,
    containerProps,
    ...restProps
}: PasswordInputProps){
    const props = useRestyle(restyleFunctions, {...containerProps})
    const [text, setText] = React.useState('')
    const [isFilled, setFilled] = React.useState(text !== '')
    const [isFocused, setFocused] = React.useState(false)

    const [showPassword, setShowPassword] = React.useState(true)

    const handleChange = (rawText: string) => {
        setText(rawText)
        setFilled(rawText !== '')
    }

    const handleOnFocus = (value: boolean) => setFocused(value)

    return (
        <Box
            width='100%'
            {...props}
        >
            <Text>{label}</Text>
            <Box
                mt='xs'
                px='sm'
                height={46}
                borderWidth={1}
                borderRadius='sm'
                alignItems="center"
                justifyContent='space-between'
                flexDirection='row'
                borderColor={isFocused || isFilled ? '$inputFilled' : '$inputEmpty'}
            >
                <TextInput 
                    value={text}
                    onChangeText={handleChange}
                    onFocus={() => handleOnFocus(true)}
                    onBlur={() => handleOnFocus(false)}
                    accessibilityRole="text"
                    secureTextEntry={showPassword}
                    {...restProps}
                />
                <TouchableOpacity onPress={() => setShowPassword(oldState => !oldState)}
                    style={{
                        height: 10,
                        width: 10,
                        borderWidth: 1
                    }}
                />
            </Box>
        </Box>
    )
}