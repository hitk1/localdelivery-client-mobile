import React, { forwardRef } from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'
import Icon from '@expo/vector-icons/Ionicons'

import {
    Container,
    ContentContainer,
    ErrorMessage,
    TextInput,
    Label,
    ErrorMessageWrapper,
    ToggleButton
} from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { defaultHitSlops } from '@/common/config/hitslop'

interface IInputProps extends TextInputProps {
    name: string
    label: string
    onChangeText?(value: string): void
    onFocus?(): void
    rawValue?: string
    disabled?: boolean
}

interface IInputFieldRef {
    focus(): void,
    name: String
}

const RawPasswordInput: React.ForwardRefRenderFunction<IInputFieldRef, IInputProps> = ({
    name,
    label,
    onChangeText,
    onFocus,
    disabled,
    ...rest
}, ref) => {
    const [isFocused, setFocused] = React.useState(false)
    const [isFilled, setFilled] = React.useState(false)
    const [isVisible, setVisible] = React.useState(false)

    const {
        registerField,
        defaultValue = '',
        fieldName,
        error
    } = useField(name)

    const inputFieldRef = React.useRef<any>(null)

    const handleToggleVisible = React.useCallback(() => {
        setVisible(oldState => !oldState)
    }, [isVisible])

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
        <Container
            disabled={disabled}
        >
            <Label>{label}</Label>
            <ContentContainer
                isFilled={isFilled}
                isFocused={isFocused}
            >
                <TextInput
                    ref={inputFieldRef}
                    defaultValue={defaultValue}
                    onFocus={() => handleInputFocus(true)}
                    onBlur={() => handleInputFocus(false)}
                    onChangeText={handleOnChange}
                    numberOfLines={1}
                    secureTextEntry={!isVisible}
                    selectTextOnFocus={!disabled}
                    editable={!disabled}
                    {...rest as any}
                />
                <ToggleButton
                    onPress={handleToggleVisible}
                    hitSlop={defaultHitSlops}
                >
                    <Icon
                        name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                    />
                </ToggleButton>
            </ContentContainer>

            <ErrorMessageWrapper>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </ErrorMessageWrapper>
        </Container>
    )
}

export default forwardRef(RawPasswordInput)