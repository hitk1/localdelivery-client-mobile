import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: ${RFValue(46)}px;

    background-color: ${({ theme }) => theme.colors.$primary};

    border-radius: ${({ theme }) => theme.spacing.md}px;

    align-items: center;
    justify-content: center;
`;

export const LabelText = styled.Text`
    color: white;

    font-weight: bold;
`;