import React from 'react'

import HooksProvider from '../hooks'
import { AuthRoutes } from './initialScreens/initialScreens.routes'

const Routes: React.FC = () => {

    return (
        <HooksProvider>
            <AuthRoutes />
        </HooksProvider>
    )
}

export default Routes