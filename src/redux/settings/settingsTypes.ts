import {
    ST_SET_THEME,
    ST_SET_LANGUAGE
} from '../actionTypes'

//------ If you add a new prop or action, you must add some code in types with mark 'Dynamic-0'
//and you should potentially add some code in types with mark 'Dynamic'


//********************REDUCER-TYPES********************//


export type SettingsStateType = {
    readonly theme: 'Dark' | 'Light'
    readonly language: 'en' | 'ru'
}       //Dynamic: Add new prop in state

export type SettingsPayloadType = {
    theme?: string
    language?: string
}       //Dynamic: Add new prop-payload in action

export type SettingsActionType = {
    type: typeof ST_SET_THEME |
        typeof ST_SET_LANGUAGE
    payload?: SettingsPayloadType
}       //Dynamic-0: Add new action CONSTANT

export type SettingsHandleType = (state: SettingsStateType, action: SettingsActionType) => SettingsStateType

export type SettingsHandlersType = {
    [ST_SET_THEME]: SettingsHandleType
    [ST_SET_LANGUAGE]: SettingsHandleType
    DEFAULT: SettingsHandleType
}       //Dynamic-0: Add new handle

export type SettingsActionCreatorType = (prop?: any) => SettingsActionType

export type SettingsReducerType = (state: SettingsStateType, action: SettingsActionType) => SettingsStateType
