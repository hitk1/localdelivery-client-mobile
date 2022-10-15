import { IApiService, IParamsOnboardingCreateAddress, IParamsOnboardingCreateBaseData, IResultOnboardingUserBasicData } from "./interfaces";
import { clientHttp } from './httpClient'

export class ApiService implements IApiService {
    
    async onboardingCreateAddress(params: IParamsOnboardingCreateAddress): Promise<any> {
        return clientHttp.post(
            '/customers/onboarding/address',
            params
        )
    }
    
    async onboardingGetUserAddress(userId: string): Promise<any> {
        return clientHttp.get(
            `/customers/onboarding/address/${userId}`
        )
    }

    async onboardingGetUserBasicData(userId: string): Promise<IResultOnboardingUserBasicData> {
        return clientHttp.get(
            `/customers/onboarding/base_data/${userId}`
        )
    }

    async onboardingCreateBaseData(params: IParamsOnboardingCreateBaseData): Promise<string> {
        const { user_id } = await clientHttp.post(
            '/customers/onboarding/base_data',
            params
        ) as { message: string, user_id: string }

        return user_id
    }

}