import { ApiCommomError } from '@/common/validations/apiErrors'
import axios from 'axios'
const { API_URL } = process.env

const clientHttp = axios.create({
    baseURL: API_URL,
    timeout: 30 * 1000,
})

clientHttp.interceptors.response.use(
    success => {
        const { data } = success

        return Promise.resolve(data)
    },
    error => {
        if (error.isAxiosError) {
            const { response } = error
            const { data } = response

            if (data.error_code)
                return Promise.reject(new ApiCommomError(
                    data.error,
                    data.error_code
                ))
            else
                return Promise.reject(`unexpected error: ${JSON.stringify(error)}`)

        } else
            console.log(JSON.stringify(error))

        return Promise.reject(`unexpected error: ${JSON.stringify(error)}`)
    }
)

// clientHttp.interceptors.request.use(
//     before => {
//         console.log(before.data)

//         return Promise.resolve(before)
//     },
//     after => after

// )

export { clientHttp }