import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface ITextInputProps {
    isFilled: boolean
    isFocused: boolean
}

export const Container = styled.View<{ disabled?: boolean }>`
    width: 100%;
    height: ${RFValue(74)}px;

    ${props => props.disabled && css`
        opacity: 0.3;
    `}
`

export const TextInput = styled.TextInput<ITextInputProps>`
    width: 92%;
`

export const ContentContainer = styled.View<ITextInputProps>`
    flex: 1;
    height: 90%;

    flex-direction: row;

    border-width: 2px;
    border-color: green;

    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.$inputEmpty};
    border-radius: ${({ theme }) => theme.spacing.md}px;

    padding-left: ${RFValue(6)}px;
    padding-right: ${RFValue(6)}px;

    ${props => (props.isFocused || props.isFilled) && css`
        border-color: ${({ theme }) => theme.colors.$inputFilled};
    `};
`;

export const ToggleButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const ErrorMessageWrapper = styled.View`
    margin-top: 6px;
    height: 14px;
`;

export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.colors.$error};
    
    align-self: flex-end;

    font-size: ${RFValue(10)}px;
    line-height: 16px;
`

export const Label = styled.Text`
    color: ${({ theme }) => theme.colors.$foreground};
    margin-bottom: 2px;
`;