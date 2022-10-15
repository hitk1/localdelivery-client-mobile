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
    // error => Promise.reject(error)
    error => {
        if (error.isAxiosError) {
            const { response } = error
            const { data } = response

            console.log('Axios error')
            console.log(JSON.stringify(data))
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