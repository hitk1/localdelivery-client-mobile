import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity<TouchableOpacityProps>`
    height: ${RFValue(46)}px;
    width: 100%;

    align-items: center;
    justify-content: center;

    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.$primary};
    border-radius: ${({ theme }) => theme.spacing.md}px;
`;

export const LabelText = styled.Text`
    color: ${({ theme }) => theme.colors.$primary};

    font-weight: bold;
`;