import authAPI, {AuthApiOptionsType} from '../../../api/authAPI'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {User} from '../../../models/User'
import {Dispatch} from '../../store'
import {authSlice} from './authSlice'


export const signUp = createAsyncThunk(
    'signUp',
    async (userData: AuthApiOptionsType, thunkAPI) => {
        try {
            const response = await authAPI.signUp(userData)
            return response.data.message
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const signIn = createAsyncThunk(
    'signIn',
    async (userData: AuthApiOptionsType, thunkAPI) => {
        try {
            const response = await authAPI.signIn(userData)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
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
