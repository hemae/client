import AxiosApi from './AxiosApi'
import {AxiosResponse} from 'axios'


export type SignUpAxiosResponseType = AxiosResponse<{ message: string }>
export type SignInAxiosResponseType = AxiosResponse<{ user: {id: string, login: string}, token: string }>

export type AuthApiOptionsType = {
    data: {
        login: string
        password: string
    }
}

const api = new AxiosApi({basePath: '/api/auth'})

const authAPI = {
    signUp({data}: AuthApiOptionsType): Promise<SignUpAxiosResponseType> {
        return api.getPromiseResponse({path: '/signup', method: 'post', data})
    },
    signIn({data}: AuthApiOptionsType): Promise<SignInAxiosResponseType> {
        return api.getPromiseResponse({path: '/signin', method: 'post', data})
    }
}

export default authAPI

