import React, { forwardRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import {
    Container,
    ErrorMessage,
    TextInput
} from './styles'

interface IInputProps extends TextInputProps {
    name: string
    onChangetext?(value: string): void
    rawValue?: string
}

interface IInputFieldRef {
    focus(): void,
    name: String
}

const RawInput: React.ForwardRefRenderFunction<IInputFieldRef, IInputProps> = ({ name, ...rest }, ref) => {
    const [isFocused, setFocused] = React.useState(false)
    const [isFilled, setFilled] = React.useState(false)

    const {
        registerField,
        defaultValue = '',
        fieldName,
        error
    } = useField(name)

    const inputFieldRef = React.useRef<any>(null)
    const inputValueRef = React.useRef<{value: string}>({ value: defaultValue })

    const onChange = React.useCallback((eventFocused: boolean) => {
        setFocused(eventFocused)
        
        if(!!eventFocused)
            setFilled(!!inputValueRef.current?.value)
    }, [])

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

    React.useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(_, value: string) {
                inputValueRef.current.value = value
                inputFieldRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = '',
                    inputFieldRef.current.clear()
            }
        })
    }, [fieldName, registerField])

    return (
        <Container>
            <TextInput />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    )
}

export const Input = forwardRef(RawInput)