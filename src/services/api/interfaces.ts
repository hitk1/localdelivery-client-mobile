
export interface IApiService {
    onboardingCreateBaseData(params: IParamsOnboardingCreateBaseData): Promise<string>
}

export interface IParamsOnboardingCreateBaseData {
    name: string
    email: string
    phone_number: string
}