import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
    height: ${RFValue(46)}px;
    width: 100%;

    position: absolute;
    top: 0;

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    margin-left: ${({ theme}) => theme.spacing.sm}px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: ${RFValue(16)}px;
`;