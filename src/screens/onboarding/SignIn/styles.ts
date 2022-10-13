import styled from 'styled-components/native'
import { Form } from '@unform/mobile'
import { RFValue } from 'react-native-responsive-fontsize';

export const BackgroundScreen = styled.TouchableWithoutFeedback`
`;

export const LoginForm = styled(Form)`
    width: 100%;
`;

export const ButtonWrapper = styled.View`
    margin-top: ${RFValue(16)}px;
    width: 100%;
`;

export const ComponentWrapper = styled.View`
    flex: 1;

    align-items: center;
    justify-content: center;
`;