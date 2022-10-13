import { IApiService, IParamsOnboardingCreateBaseData } from "./interfaces";
import { clientHttp } from './httpClient'

export class ApiService implements IApiService {

    async onboardingCreateBaseData(params: IParamsOnboardingCreateBaseData): Promise<string> {
        const { user_id } = await clientHttp.post(
            '/customers/onboarding/base_data',
            params
        ) as { message: string, user_id: string }

        return user_id
    }

}