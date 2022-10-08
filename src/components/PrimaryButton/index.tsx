import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Text } from 'react-native-svg'
import { Container, LabelText } from './styles'

interface Props{
    onPress(): void
    label: string
}


const PrimaryButton: React.FC<Props> = ({
    onPress,
    label,
    ...rest
}) => {

    return (
        <Container
            onPress={onPress}
            {...rest}
        >
            <LabelText>{label}</LabelText>
        </Container>
    )
}

export default PrimaryButton