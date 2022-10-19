import React from 'react'
import Icon from '@expo/vector-icons/Ionicons'

import {
    Container,
    BackButton,
    Title
} from './styles'
import { defaultHitSlops } from '@/common/config/hitslop'

interface Props {
    backButtonAction(): void,
    title: string
}

const Header: React.FC<Props> = ({
    backButtonAction,
    title
}) => {

    return (
        <Container>
            <BackButton
                onPress={backButtonAction}
                hitSlop={defaultHitSlops}
            >
                <Icon 
                    name="arrow-back"
                    size={22}
                    color="#000"
                />  
            </BackButton>
            <Title>{title}</Title>
        </Container>
    )
}

export default Header