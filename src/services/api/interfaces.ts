
export interface IApiService {
    onboardingCreateBaseData(params: IParamsOnboardingCreateBaseData): Promise<string>
    onboardingGetUserBasicData(userId: string): Promise<IResultOnboardingUserBasicData>
    onboardingGetUserAddress(userId: string): Promise<IResultOnboardingGetAddress>
    onboardingCreateAddress(params: IParamsOnboardingCreateAddress): Promise<IResultOnboardingCreateAddress>
    onboardingRegisterPassword(params: IParamsOnboardingAssignPassword): Promise<{ message: string }>
    refreshToken(refreshToken: string): Promise<IResultLogin>
    signIn(email: string, password: string): Promise<IResultLogin>
}

export interface IResultLogin {
    customer: {
        email: string
        id: string
        is_active: string
        name: string
    },
    refresh_token: string
    role: string
    token: string
}
export interface IParamsOnboardingAssignPassword {
    customer_id: string
    password: string
    repeat_password: string
}

export interface IResultOnboardingGetAddress {
    address: {
        address: string,
        address_alias?: string
        city_name: string
        complement?: string
        ibge_code: string
        neighborhood: string
        number: string
        zip_code: string
        state: string
    }
}

export interface IResultOnboardingCreateAddress {
    address_id: string
    message: string
}

export interface IParamsOnboardingCreateAddress {
    address: string
    number: string
    complement: string
    neighborhood: string
    ibge_code: string
    zip_code: string
    address_alias: string
    customer_id: string
}
export interface IResultOnboardingUserBasicData {
    customer: {
        id: string,
        name: string,
        email: string
        phone_number: string
    }
}
export interface IParamsOnboardingCreateBaseData {
    name: string
    email: string
    phone_number: string
}