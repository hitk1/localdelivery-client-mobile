
export interface IApiService {
    onboardingCreateBaseData(params: IParamsOnboardingCreateBaseData): Promise<string>
    onboardingGetUserBasicData(userId: string): Promise<IResultOnboardingUserBasicData>
    onboardingGetUserAddress(userId: string): Promise<any>
    onboardingCreateAddress(params: IParamsOnboardingCreateAddress): Promise<any>
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