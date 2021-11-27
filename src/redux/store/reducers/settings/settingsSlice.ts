import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LanguageType, ThemeType} from '../../../models/settings'


type SettingsStateType = {
    theme: ThemeType
    language: LanguageType
}

const initialState: SettingsStateType = {
    theme: 'Light',
    language: 'en'
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state: SettingsStateType, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        setLanguage(state: SettingsStateType, action: PayloadAction<LanguageType>) {
            state.language = action.payload
            localStorage.setItem('language', action.payload)
        }
    }
})


export default settingsSlice.reducer
