import React from 'react'
import BackIcon from '@iconscout/react-native-unicons/icons/uil-arrow-left'

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
                <BackIcon 
                    size={22}
                    color="#000"
                />
            </BackButton>
            <Title>{title}</Title>
        </Container>
    )
}

export default Header