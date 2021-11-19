import authAPI, {AuthApiOptionsType, SignUpAxiosResponseType, SignInAxiosResponseType} from '../../../api/authAPI'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {User} from '../../../models/User'
import {Dispatch} from '../../store'
import {authSlice} from './authSlice'


export const signUp = createAsyncThunk(
    'signUp',
    async (data: AuthApiOptionsType, thunkAPI) => {
        try {
            const response: SignUpAxiosResponseType = await authAPI.signUp(data)
            return response.data.message
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const signIn = createAsyncThunk(
    'signIn',
    async (data: AuthApiOptionsType, thunkAPI) => {
        try {
            const response: SignInAxiosResponseType = await authAPI.signIn(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const login = () => (dispatch: Dispatch) => {
    const storageUserData: string | null = localStorage.getItem('storageUser')
    const storageToken: string | null = localStorage.getItem('token')
    if (storageUserData && storageToken) {
        const user: User = JSON.parse(storageUserData)
        const token: string = storageToken
        dispatch(authSlice.actions.login({user, token}))
    }
}


export type SignType = (payload: { login: string, password: string }) => void
export type LogType = () => void
