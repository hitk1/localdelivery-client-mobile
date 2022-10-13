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
    error => Promise.reject(error)
)

clientHttp.interceptors.request.use(
    before => {
        console.log(before.data)

        return Promise.resolve(before)
    },
    after => after

)

export { clientHttp }