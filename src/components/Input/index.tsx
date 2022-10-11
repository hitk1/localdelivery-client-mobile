import React, { forwardRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import {
    Container,
    ErrorMessage,
    TextInput,
    Label,
    ErrorMessageWrapper
} from './styles'
import { Input } from '..'

interface IInputProps extends TextInputProps {
    name: string
    label: string
    onChangeText?(value: string): void
    onFocus?(): void
    rawValue?: string
}

interface IInputFieldRef {
    focus(): void,
    name: String
}

const RawInput: React.ForwardRefRenderFunction<IInputFieldRef, IInputProps> = ({ name, label, onChangeText, onFocus, ...rest }, ref) => {
    const [isFocused, setFocused] = React.useState(false)
    const [isFilled, setFilled] = React.useState(false)

    const {
        registerField,
        defaultValue = '',
        fieldName,
        error
    } = useField(name)

    const inputFieldRef = React.useRef<any>(null)

    React.useEffect(() => {
        inputFieldRef.current.value = defaultValue
    }, [defaultValue])

    React.useEffect(() => {
        if (inputFieldRef.current)
            inputFieldRef.current.value = defaultValue
    }, [defaultValue])

    React.useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputFieldRef.current?.focus()
            },
            name: fieldName,
        }),
        []
    )

    const handleInputFocus = (value: boolean) => {
        setFocused(value)
        setFilled(!!inputFieldRef.current.value)

        if (value && onFocus)   //Is needed to be able to handle focus event on screen
            onFocus()
    }

    const handleOnChange = React.useCallback((text: string) => {
        if (inputFieldRef.current)
            inputFieldRef.current.value = text

        if (onChangeText)
            onChangeText(text)
    }, [onChangeText])

    React.useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputFieldRef.current,
            getValue: () => {
                if (inputFieldRef.current)
                    return inputFieldRef.current.value

                return ''
            },
            setValue: (_, value) => {
                if (inputFieldRef.current) {
                    inputFieldRef.current.setNativeProps({ text: value })
                    inputFieldRef.current.value = value
                }
            },
            clearValue: () => {
                if (inputFieldRef.current) {
                    inputFieldRef.current.setNativeProps({ text: '' })
                    inputFieldRef.current.value = ''
                }
            }
        })
    }, [fieldName, registerField])

    return (
        <Container>
            <Label>{label}</Label>
            <TextInput
                ref={inputFieldRef}
                isFilled={isFilled}
                isFocused={isFocused}
                defaultValue={defaultValue}
                onFocus={() => handleInputFocus(true)}
                onBlur={() => handleInputFocus(false)}
                onChangeText={handleOnChange}
                numberOfLines={1}
                {...rest as any}
            />

            <ErrorMessageWrapper>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </ErrorMessageWrapper>
        </Container>
    )
}

export default forwardRef(RawInput)