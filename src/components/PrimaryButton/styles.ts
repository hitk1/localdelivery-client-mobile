import styled, { css } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity<{ disabled: boolean }>`
    width: 100%;
    height: ${RFValue(46)}px;

    background-color: ${({ theme }) => theme.colors.$primary};

    border-radius: ${({ theme }) => theme.spacing.md}px;

    align-items: center;
    justify-content: center;

    ${props => props.disabled && css`
        opacity: 0.3;
    `}
`;

export const LabelText = styled.Text`
    color: white;

    font-weight: bold;
`;