import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, LabelText } from './styles'

interface Props extends TouchableOpacityProps {
    onPress(): void
    label: string
    disabled?: boolean
}


const PrimaryButton: React.FC<Props> = ({
    onPress,
    label,
    disabled,
    ...rest
}) => {

    return (
        <Container
            onPress={onPress}
            disabled={disabled}
            {...rest as any}
        >
            <LabelText>{label}</LabelText>
        </Container>
    )
}

export default PrimaryButton