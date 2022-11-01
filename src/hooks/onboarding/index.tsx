import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IOnboardingContext {
    onboardingUserId: string | null
    onboardingAddressId: string | null
    saveUserId(userId: string): Promise<void>
    getUserId(): Promise<string>
    saveAddressId(addressId: string): Promise<void>
    getAddressId(): Promise<string>
    clearOnboarding(): Promise<void>
}

const OnboardingContext = React.createContext<IOnboardingContext>({} as IOnboardingContext)

type ProviderProps = {
    children: React.ReactNode
}

const OnboardingProvider: React.FC<ProviderProps> = ({ children }) => {
    const [userId, setUserId] = React.useState<string | null>(null)
    const [addressId, setAddressId] = React.useState<string | null>(null)

    const saveUserId = async (userId: string) => {
        await AsyncStorage.setItem('@localdelivery:onboarding:user', userId)
        setUserId(userId)
    }

    const getUserId = async () => {
        const result = await AsyncStorage.getItem('@localdelivery:onboarding:user')

        if (!result)
            return ''

        return result
    }

    const saveAddressId = async (addressId: string) => await AsyncStorage.setItem('@localdelivery:onboarding:address', addressId)

    const getAddressId = async () => {
        const result = await AsyncStorage.getItem('@localdelivery:onboarding:address')

        if(!result)
            return ''

        return result
    }

    const clearOnboarding = async () => {
        await Promise.all([
            AsyncStorage.removeItem('@localdelivery:onboarding:user'),
            AsyncStorage.removeItem('@localdelivery:onboarding:address'),
        ])
    }

    React.useEffect(() => {
        (async () => {
            const [
                userId,
                addressId
            ] = await Promise.all([
                getUserId(),
                getAddressId()
            ])

            if(userId)
                setUserId(userId)
            
            if(addressId)
                setAddressId(addressId)
        })()
    }, [])

    return <OnboardingContext.Provider value={{
        onboardingUserId: userId,
        onboardingAddressId: addressId,
        saveUserId,
        getUserId,
        saveAddressId,
        getAddressId,
        clearOnboarding,
    }}>
        {children}
    </OnboardingContext.Provider>
}

const useOnboarding = () => {
    const context = useContext(OnboardingContext)

    if (!context)
        throw new Error('Unexpected error, context not found')

    return context
}

export {
    OnboardingProvider,
    useOnboarding
}