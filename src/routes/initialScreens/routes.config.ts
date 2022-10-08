import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum eInitialRouteNames {
    SIGN_IN = 'SignIn',
    ONBOARDING = 'Onboarding'
}

export type InitialScreensStackScreenParamsList = {
    SignIn: undefined,
    Onboarding: undefined
}

export type InitialScreenProps = NativeStackScreenProps<InitialScreensStackScreenParamsList>