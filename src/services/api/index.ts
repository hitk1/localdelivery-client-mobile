import { IApiService, IParamsOnboardingAssignPassword, IParamsOnboardingCreateAddress, IParamsOnboardingCreateBaseData, IResultLogin, IResultOnboardingCreateAddress, IResultOnboardingGetAddress, IResultOnboardingUserBasicData } from "./interfaces";
import { clientHttp } from './httpClient'

export class ApiService implements IApiService {

    async signIn(email: string, password: string): Promise<IResultLogin> {
        return clientHttp.post(
            '/session/customers',
            {
                email,
                password
            }
        )
    }

    async refreshToken(refreshToken: string): Promise<IResultLogin> {
        return clientHttp.put(
            '/session/refresh_token',
            {
                token: refreshToken
            }
        )
    }

    async onboardingRegisterPassword(params: IParamsOnboardingAssignPassword): Promise<{ message: string; }> {
        return clientHttp.post(
            '/customers/onboarding/assign',
            params
        )
    }

    async onboardingCreateAddress(params: IParamsOnboardingCreateAddress): Promise<IResultOnboardingCreateAddress> {
        return clientHttp.post(
            '/customers/onboarding/address',
            params
        )
    }

    async onboardingGetUserAddress(userId: string): Promise<IResultOnboardingGetAddress> {
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