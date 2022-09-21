import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamsList = {
    Login: undefined,
    Onboarding: undefined
}

export type StackScreenProps = NativeStackScreenProps<RootStackParamsList>