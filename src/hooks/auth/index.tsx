import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiService } from '@/services/api'
import { clientHttp } from '@/services/api/httpClient'
import { ApiCommomError } from '@/common/validations/apiErrors'

interface IAuthContext {
    signIn(email: string, password: string): Promise<void>
    user: IUserData | null
    token: string | null
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
    const [token, setToken] = React.useState<string | null>(null)

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
            setRefreshed(true)
            setRefreshToken(refresh_token)
            setToken(token)


            clientHttp.defaults.headers.authorization = `Bearer ${token}`

            await AsyncStorage.setItem('@localdelivery:auth:user', JSON.stringify(user))
            await AsyncStorage.setItem('@localdelivery:auth:refresh_token', refresh_token)
        } catch (error) {
            throw error
        }
    }, [user, refreshToken, token, isRefreshed])

    const clearUserData = React.useCallback(async () => {
        await AsyncStorage.removeItem('@localdelivery:auth:user')
        await AsyncStorage.removeItem('@localdelivery:auth:refresh_token')

        clientHttp.defaults.headers.authorization = ''

        setUser(null)
        setRefreshToken(null)
        setRefreshed(false)
    }, [user, refreshToken, isRefreshed])

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
                    setToken(token)
                    clientHttp.defaults.headers.authoziration = `Bearer ${token}`

                    await AsyncStorage.setItem('@localdelivery:auth:user', JSON.stringify(user))
                    await AsyncStorage.setItem('@localdelivery:auth:refresh_token', refresh_token)
                } catch (error) {
                    if (error instanceof ApiCommomError) {
                        const {
                            errorCode
                        } = error

                        console.log('Refresh token missed!')
                        //Token doesn't exist
                        if (errorCode === 'not_found')
                            clearUserData()
                    }

                    console.log('Error on try to refresh token')
                    console.log(error.message)
                    console.log({ error })
                }
            }
        })()
    }, [refreshToken, isRefreshed])

    return <AuthContext.Provider value={{
        signIn,
        user,
        token
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