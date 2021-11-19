import {StateType} from '../redux/StateType'
import {SettingsActionCreatorType} from '../redux/settings/settingsTypes'


export type AppPropsType = {
    isAuthenticated: boolean
}

export type AppMapStateToPropsType = (state: StateType) => AppPropsType

export type AppCallbacksType = {
    setTheme: SettingsActionCreatorType
    setLanguage: SettingsActionCreatorType
    login: any
}

export type AppAdditionalPropsType = {
    theme: 'Dark' | 'Light'
}

export type AppContextPropsType = AppCallbacksType & AppPropsType & AppAdditionalPropsType