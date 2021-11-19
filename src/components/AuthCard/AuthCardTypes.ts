import {StateType} from '../../redux/StateType'
import {AuthActionCreatorType} from '../../redux/auth/authTypes'


export type FormType = {
    login: string
    password: string
}

export type AuthCardExternalPropsType = {
    type: 'signIn' | 'signUp'
    isShown: boolean
    closeCard: () => void
}

export type AuthCardPropsType = {
    isLoading: boolean
    error: string | null
    notice: string | null
}

export type AuthCardMapStateToPropsType = (state: StateType) => AuthCardPropsType

export type AuthCardCallbacksType = {
    signUp: any
    signIn: any
    setError: AuthActionCreatorType
    setNotice: AuthActionCreatorType
}

export type AuthCardAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
}

export type AuthCardContextPropsType = AuthCardCallbacksType & AuthCardPropsType & AuthCardAdditionalPropsType