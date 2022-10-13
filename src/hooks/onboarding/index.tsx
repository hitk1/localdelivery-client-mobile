import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IOnboardingContext {
    saveUserId(userId: string): Promise<void>
    getUserId(): Promise<string>
    clearOnboarding(): Promise<void>
}

const OnboardingContext = React.createContext<IOnboardingContext>({} as IOnboardingContext)

type ProviderProps = {
    children: React.ReactNode
}

const OnboardingProvider: React.FC<ProviderProps> = ({ children }) => {

    const saveUserId = async (userId: string) => await AsyncStorage.setItem('@localdelivery:onboarding:user', userId)

    const getUserId = async () => {
        const result = await AsyncStorage.getItem('@localdelivery:onboarding:user')

        if (!result)
            return ''

        return result
    }

    const clearOnboarding = async () => await AsyncStorage.removeItem('@localdelivery:onboarding:user')

    return <OnboardingContext.Provider value={{
        clearOnboarding,
        saveUserId,
        getUserId
    }}>
        {children}
    </OnboardingContext.Provider>
}

const useOnboarding = () => {
    const context = useContext(OnboardingContext)
    
    if(!context)
        throw new Error('Unexpected error, context not found')

    return context
}

export {
    OnboardingProvider,
    useOnboarding
}