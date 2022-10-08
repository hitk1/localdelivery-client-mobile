import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    width: 100%;

    padding-left: ${RFValue(12)}px;
    padding-right: ${RFValue(12)}px;

    margin-top: ${getStatusBarHeight() + 6}px;
`;