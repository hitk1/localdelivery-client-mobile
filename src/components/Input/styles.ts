import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface ITextInputProps {
    isFilled: boolean
    isFocused: boolean
}

interface IContainerProps {
    disabled?: boolean
}

export const Container = styled.View<IContainerProps>`
    width: 100%;
    height: ${RFValue(74)}px;

    ${props => props.disabled && css`
        opacity: 0.3;
    `}
`

export const TextInput = styled.TextInput<ITextInputProps>`
    flex: 1;
    height: 90%;

    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.$inputEmpty};
    border-radius: ${({ theme }) => theme.spacing.md}px;

    padding-left: ${RFValue(6)}px;
    padding-right: ${RFValue(6)}px;

    ${props => (props.isFocused || props.isFilled) && css`
        border-color: ${({ theme }) => theme.colors.$inputFilled};
    `};

`

export const ErrorMessageWrapper = styled.View`
    margin-top: 6px;
    height: 14px;
`;

export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.$error};
    
    align-self: flex-end;

    font-size: ${RFValue(14)}px;
    line-height: 16px;
`

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.$foreground};
    margin-bottom: 2px;
`;