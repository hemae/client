import {
    AUTH_SET_AUTHENTICATED,
    AUTH_SET_USER_DATA,
    AUTH_SET_TOKEN,
    AUTH_SET_LOADING,
    AUTH_SET_ERROR,
    AUTH_SET_NOTICE
} from '../actionTypes'
import {User} from '../models/User'


//------ If you add a new prop or action, you must add some code in types with mark 'Dynamic-0'
//and you should potentially add some code in types with mark 'Dynamic'


//********************OBJECT-TYPES********************//

//********************REDUCER-TYPES********************//


export type AuthStateType = {
    readonly authUserData: User | null
    readonly token: string | null
    readonly isAuthenticated: boolean
    readonly isLoading: boolean
    readonly error: string | null
    readonly notice: string | null
}       //Dynamic: Add new prop in state

export type AuthPayloadType = {
    isAuthenticated?: boolean
    token?: string
    authUserData?: User | null
    isLoading?: boolean
    error?: string
    notice?: string
}       //Dynamic: Add new prop-payload in action

export type AuthActionType = {
    type: typeof AUTH_SET_AUTHENTICATED |
        typeof AUTH_SET_TOKEN |
        typeof AUTH_SET_USER_DATA |
        typeof AUTH_SET_LOADING |
        typeof AUTH_SET_ERROR |
        typeof AUTH_SET_NOTICE
    payload?: AuthPayloadType
}       //Dynamic-0: Add new action CONSTANT

export type AuthHandleType = (state: AuthStateType, action: AuthActionType) => AuthStateType

export type AuthHandlersType = {
    [AUTH_SET_AUTHENTICATED]: AuthHandleType
    [AUTH_SET_TOKEN]: AuthHandleType
    [AUTH_SET_USER_DATA]: AuthHandleType
    [AUTH_SET_LOADING]: AuthHandleType
    [AUTH_SET_ERROR]: AuthHandleType
    [AUTH_SET_NOTICE]: AuthHandleType
    DEFAULT: AuthHandleType
}       //Dynamic-0: Add new handle

export type AuthActionCreatorType = (prop?: any) => AuthActionType

export type AuthReducerType = (state: AuthStateType, action: AuthActionType) => AuthStateType
