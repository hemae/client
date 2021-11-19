import {StateType} from '../StateType'
import {User} from '../models/User'


export const getIsAuthenticatedFrom = (state: StateType): boolean => {
    return state.auth.isAuthenticated
}

export const getTokenFrom = (state: StateType): string | null => {
    return state.auth.token
}

export const getUserIdFrom = (state: StateType): string | null => {
    return state.auth.authUserData ? state.auth.authUserData._id : null
}

export const getAuthUserDataFrom = (state: StateType): User | null => {
    return state.auth.authUserData
}

export const getAuthIsLoadingFrom = (state: StateType): boolean => {
    return state.auth.isLoading
}

export const getAuthErrorFrom = (state: StateType): string | null => {
    return state.auth.error
}

export const getAuthNoticeFrom = (state: StateType): string | null => {
    return state.auth.notice
}