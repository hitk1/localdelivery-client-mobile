import React, { ReactChildren, ReactElement, ReactNode } from 'react'

import {
    Container
} from './styles'

type Props = {
    children: React.ReactNode
}

const ScreenContainer = ({ children }: Props) => {

    return (
        <Container>
            {children}
        </Container>
    )
}

export default ScreenContainer