import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { 
    Container,
    LabelText
 } from './styles'

interface Props extends TouchableOpacityProps{
    label: string
    onPress(): void
}

const SecondaryButton: React.FC<Props> = ({
    onPress,
    label,
    ...rest
}) => {

    return (
        <Container
            onPress={onPress}
            {...rest as any}
        >
            <LabelText>{label}</LabelText>
        </Container>
    )
}

export default SecondaryButton