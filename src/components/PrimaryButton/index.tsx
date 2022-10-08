import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, LabelText } from './styles'

interface Props extends TouchableOpacityProps {
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
            {...rest as any}
        >
            <LabelText>{label}</LabelText>
        </Container>
    )
}

export default PrimaryButton