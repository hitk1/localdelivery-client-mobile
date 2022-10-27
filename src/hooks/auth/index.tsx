import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiService } from '@/services/api'
import { clientHttp } from '@/services/api/httpClient'

interface IAuthContext {
    signIn(email: string, password: string): Promise<void>
    user: IUserData | null
}

type ProviderProps = {
    children: React.ReactNode
}

interface IUserData {
    user: {
        id: string
        email: string
        name: string
    }
}

const api = new ApiService()
const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [isRefreshed, setRefreshed] = React.useState(false)
    const [user, setUser] = React.useState<IUserData | null>(null)
    const [refreshToken, setRefreshToken] = React.useState<string | null>(null)

    const signIn = React.useCallback(async (email: string, password: string) => {
        try {
            const {
                customer,
                refresh_token,
                token
            } = await api.signIn(email, password)

            const user = {
                id: customer.id,
                email: customer.email,
                name: customer.name
            }

            setUser({ user })
            setRefreshToken(refresh_token)

            clientHttp.defaults.headers.authoziration = `Bearer ${token}`

            await AsyncStorage.setItem('@localdelivery:auth:user', JSON.stringify(user))
            await AsyncStorage.setItem('@localdelivery:auth:refresh_token', refresh_token)
        } catch (error) {
            console.log('error on try to login')
        }
    }, [])

    React.useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem('@localdelivery:auth:user')
            const refreshToken = await AsyncStorage.getItem('@localdelivery:auth:refresh_token')

            if (user) {
                const parsedUser = JSON.parse(user) as IUserData
                setUser(parsedUser)
            }

            if (refreshToken)
                setRefreshToken(refreshToken)
        })()
    }, [])

    React.useEffect(() => {
        (async () => {
            if (refreshToken && !isRefreshed) {
                try {
                    const {
                        customer,
                        refresh_token,
                        token
                    } = await api.refreshToken(refreshToken)

                    setUser({
                        user: {
                            id: customer.id,
                            email: customer.email,
                            name: customer.name
                        }
                    })

                    setRefreshed(true)
                    setRefreshToken(refresh_token)
                    clientHttp.defaults.headers.authoziration = `Bearer ${token}`
                } catch (error) {
                    console.log('Error on try to refresh token')
                    console.log(error.message)
                }
            }
        })()
    }, [refreshToken, isRefreshed])

    return <AuthContext.Provider value={{
        signIn,
        user
    }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error('Unexpected error, auth context not found')

    return context
}

export {
    AuthProvider,
    useAuth
}