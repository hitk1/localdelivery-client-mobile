import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(46)}px;

    border-width: 1px;
    border-color: 'black';
`

export const TextInput = styled.TextInput`
    flex: 1;
`

export const ErrorMessage = styled(TextInput)`
    color: ${({ theme }) => theme.colors.red};

    font-size: ${RFValue(14)}px;
    align-self: 'flex-end';
    line-height: 12px;
`