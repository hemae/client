import {StateType} from '../../../redux/StateType'


export type AuthButtonExternalPropsType = {

}

export type AuthButtonPropsType = {
    isAuthenticated: boolean
}

export type AuthButtonMapStateToPropsType = (state: StateType) => AuthButtonPropsType

export type AuthButtonCallbacksType = {
    logout: any
}

export type AuthButtonAdditionalPropsType = {
    language: 'en' | 'ru'
    theme: 'Dark' | 'Light'
}

export type AuthButtonContextPropsType = AuthButtonCallbacksType & AuthButtonPropsType & AuthButtonAdditionalPropsType