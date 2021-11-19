import {
    ST_SET_LANGUAGE,
    ST_SET_THEME
} from '../actionTypes'
import {
    SettingsActionCreatorType,
    SettingsHandlersType,
    SettingsHandleType,
    SettingsReducerType,
    SettingsStateType
} from './settingsTypes'


//--------- Before changing or creating any props, handles or functions,
// DESIGN OR REDESIGN CORRESPONDING TYPES in 'actionTypes.ts', 'chatTypes.ts' ---//

const settingsHandlers: SettingsHandlersType = {
    [ST_SET_THEME]: (state, action) => ({
        ...state,
        theme: action.payload?.theme!
    }),
    [ST_SET_LANGUAGE]: (state, action) => ({
        ...state,
        language: action.payload?.language!
    }),
    DEFAULT: state => state
}

const initialState: SettingsStateType = {
    theme: 'Light',
    language: 'en'
}

export const settingsReducer: SettingsReducerType = (state = initialState, action) => {
    const handle: SettingsHandleType = settingsHandlers[action.type] || settingsHandlers.DEFAULT
    return handle(state, action)
}

//------------------ACTION-CREATORS------------------

export const setTheme: SettingsActionCreatorType = (theme: string) => {
    localStorage.setItem('theme', theme)
    return {type: ST_SET_THEME, payload: {theme}}
}

export const setLanguage: SettingsActionCreatorType = (language: string) => {
    localStorage.setItem('language', language)
    return {type: ST_SET_LANGUAGE, payload: {language}}
}
