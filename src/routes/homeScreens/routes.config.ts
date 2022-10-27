import { NativeStackScreenProps } from '@react-navigation/native-stack'

export enum eAppRoutesNames {
    HOME = 'Home'
}

export type AppScreenStackParamsList = {
    Home: undefined
}

export type AppScreensProps = NativeStackScreenProps<AppScreenStackParamsList>