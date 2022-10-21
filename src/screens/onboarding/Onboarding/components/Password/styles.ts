import styled, { css } from 'styled-components/native'
import { Form } from '@unform/mobile';
import { RFValue } from 'react-native-responsive-fontsize';

interface IValidation {
    isValid?: boolean
}

export const Container = styled.ScrollView``;

export const OnboardingForm = styled(Form)``;

export const PasswordMetadataContainer = styled.View`
    margin-top: ${({ theme }) => RFValue(theme.spacing.md)}px;
    margin-left: ${({ theme }) => RFValue(theme.spacing.sm)}px;
`;

export const RowContainer = styled.View`
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;
`;

export const Validation = styled.Text<IValidation>`
    margin-left: ${({ theme }) => RFValue(theme.spacing.sm)}px;
    font-size: ${RFValue(10)}px;

    ${props => props.isValid && css`
        opacity: 0.4;
        text-decoration: line-through;
    `}
`;
