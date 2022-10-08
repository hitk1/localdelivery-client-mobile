import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const StepsInfo = styled.View`
    margin-top: ${RFValue(46 + 32)}px;
`;

export const StepDescription = styled.Text`
    font-size: 16px;
    font-weight: bold;

    margin-top: ${({ theme }) => theme.spacing.sm}px;
`;

export const FormWrapper = styled.View`
    margin-top: ${({ theme }) => RFValue(theme.spacing.xxl)}px;
`;