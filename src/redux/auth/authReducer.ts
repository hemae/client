import {
    AUTH_SET_AUTHENTICATED,
    AUTH_SET_ERROR,
    AUTH_SET_LOADING,
    AUTH_SET_NOTICE,
    AUTH_SET_TOKEN,
    AUTH_SET_USER_DATA
} from '../actionTypes'
import {AuthActionCreatorType, AuthHandlersType, AuthHandleType, AuthReducerType, AuthStateType} from './authTypes'
import authAPI from '../api/authAPI'
import {AxiosResponse} from 'axios'
import {User} from '../models/User'
import {ThunkCreatorType} from '../ThunkTypes'


//--------- Before changing or creating any props, handles or functions,
// DESIGN OR REDESIGN CORRESPONDING TYPES in 'actionTypes.ts', 'chatTypes.ts' ---//


const authHandlers: AuthHandlersType = {
    [AUTH_SET_AUTHENTICATED]: (state, action) => ({
        ...state,
        isAuthenticated: action.payload?.isAuthenticated!
    }),
    [AUTH_SET_TOKEN]: (state, action) => ({
        ...state,
        token: action.payload?.token!
    }),
    [AUTH_SET_USER_DATA]: (state, action) => ({
        ...state,
        authUserData: action.payload?.authUserData!
    }),
    [AUTH_SET_LOADING]: (state, action) => ({
        ...state,
        isLoading: action.payload?.isLoading!
    }),
    [AUTH_SET_ERROR]: (state, action) => ({
        ...state,
        error: action.payload?.error!
    }),
    [AUTH_SET_NOTICE]: (state, action) => ({
        ...state,
        notice: action.payload?.notice!
    }),
    DEFAULT: state => state
}

const initialState: AuthStateType = {
    authUserData: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    notice: null
}

export const authReducer: AuthReducerType = (state = initialState, action) => {
    const handle: AuthHandleType = authHandlers[action.type] || authHandlers.DEFAULT
    return handle(state, action)
}

//------------------ACTION-CREATORS------------------

export const setIsAuthenticated: AuthActionCreatorType = (isAuthenticated: boolean) => ({
    type: AUTH_SET_AUTHENTICATED,
    payload: {isAuthenticated}
})

export const setToken: AuthActionCreatorType = (token: string) => ({
    type: AUTH_SET_TOKEN,
    payload: {token}
})

export const setAuthUserData: AuthActionCreatorType = (authUserData: User) => {
    localStorage.setItem('storageUser', JSON.stringify(authUserData))
    return {
        type: AUTH_SET_USER_DATA,
        payload: {authUserData}
    }
}

export const setIsLoading: AuthActionCreatorType = (isLoading: boolean) => ({
    type: AUTH_SET_LOADING,
    payload: {isLoading}
})

export const setError: AuthActionCreatorType = (error: string) => ({
    type: AUTH_SET_ERROR,
    payload: {error}
})

export const setNotice: AuthActionCreatorType = (notice: string) => ({type: AUTH_SET_NOTICE, payload: {notice}})


//------------------THUNK-CREATORS------------------

const setStorageAppUserData = (payload: {
    token: string,
    authUserData: User
}) => {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('storageUser', JSON.stringify(payload.authUserData))
}

const removeStorageAppUserData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('storageUser')
}

export const signUp: ThunkCreatorType = (payload: { login: string, password: string }) => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        // const response: AxiosResponse = await authAPI.signUp(payload)
        // dispatch(setNotice(response.data.message))
        // dispatch(setIsLoading(false))
    } catch (e: any) {
        dispatch(setError(e.response.data.message))
        dispatch(setIsLoading(false))
    }
}

export const signIn: ThunkCreatorType = (payload: { login: string, password: string }) => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        // const response: AxiosResponse = await authAPI.signIn(payload)
        // setStorageAppUserData({token: response.data.token, authUserData: response.data.user})
        // dispatch(setIsAuthenticated(true))
        // dispatch(setAuthUserData(response.data.user))
        // dispatch(setToken(response.data.token))
        // dispatch(setIsLoading(false))
    } catch (e: any) {
        dispatch(setError(e.response.data.message))
        dispatch(setIsLoading(false))
        throw e
    }
}

export const login: ThunkCreatorType = () => (dispatch) => {
    const storageUserData: string | null = localStorage.getItem('storageUser')
    const storageToken: string | null = localStorage.getItem('token')
    if (storageUserData && storageToken) {
        const userData: User = JSON.parse(storageUserData)
        const token: string = storageToken
        dispatch(setIsAuthenticated(true))
        dispatch(setAuthUserData(userData))
        dispatch(setToken(token))
    }
}

export const logout: ThunkCreatorType = () => (dispatch) => {
    dispatch(setIsAuthenticated(false))
    removeStorageAppUserData()
    dispatch(setAuthUserData(null))
    dispatch(setToken(null))
}
