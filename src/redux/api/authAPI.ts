import AxiosApi from './AxiosApi'
import {AxiosResponse} from 'axios'


export type SignUpResponseType = { message: string }
export type SignUpAxiosResponseType = AxiosResponse<SignUpResponseType>

export type LogInResponsePayloadType = { user: {id: string, login: string}, token: string, message: string }
export type SignInAxiosResponseType = AxiosResponse<LogInResponsePayloadType>

export type AuthApiOptionsType = {
    data: {
        login: string
        password: string
    }
}

const api = new AxiosApi({basePath: '/api/auth'})

const authAPI = {
    signUp({data}: AuthApiOptionsType): Promise<SignUpAxiosResponseType> {
        return api.getPromiseResponse<SignUpResponseType>({path: '/signup', method: 'post', data})
    },
    signIn({data}: AuthApiOptionsType): Promise<SignInAxiosResponseType> {
        return api.getPromiseResponse<LogInResponsePayloadType>({path: '/signin', method: 'post', data})
    }
}

export default authAPI

