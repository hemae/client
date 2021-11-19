import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {signIn, signUp} from './authThunkCreators'
import {User} from '../../../models/User'
import {removeStorageAppUserData, setStorageAppUserData} from './localStorageHelpers'


type AuthStateType = {
    authUserData: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
    notice: string | null
}

const initialState: AuthStateType = {
    authUserData: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    notice: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state: AuthStateType, action: PayloadAction<{ user: {id: string, login: string}, token: string }>) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.authUserData = action.payload.user
        },
        logout(state: AuthStateType) {
            state.isAuthenticated = false
            removeStorageAppUserData()
            state.token = null
            state.authUserData = null
        }
    },
    extraReducers: {
        [signUp.pending.type]: (state: AuthStateType) => {
            state.isLoading = true
        },
        [signUp.fulfilled.type]: (state: AuthStateType, action: PayloadAction<string>) => {
            state.error = ''
            state.notice = action.payload
            state.isLoading = false
        },
        [signUp.rejected.type]: (state: AuthStateType, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = action.payload
            state.isLoading = false
        },

        [signIn.pending.type]: (state: AuthStateType) => {
            state.isLoading = true
        },
        [signIn.fulfilled.type]: (state: AuthStateType, action: PayloadAction<{ user: {id: string, login: string}, token: string }>) => {
            state.error = ''
            setStorageAppUserData({token: action.payload.token, authUserData: action.payload.user})
            state.isAuthenticated = true
            state.token = action.payload.token
            state.authUserData = action.payload.user
            state.isLoading = false
        },
        [signIn.rejected.type]: (state: AuthStateType, action: PayloadAction<string>) => {
            state.notice = ''
            state.error = action.payload
            state.isLoading = false
        }
    }
})


export default authSlice.reducer