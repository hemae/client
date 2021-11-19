import {StateType} from '../../redux/StateType'
import {SettingsActionCreatorType} from '../../redux/settings/settingsTypes'


export type HeaderExternalPropsType = {

}

export type HeaderPropsType = {
    isAuthenticated: boolean
}

export type HeaderMapStateToPropsType = (state: StateType) => HeaderPropsType

export type HeaderCallbacksType = {
    setTheme: SettingsActionCreatorType
    setLanguage: SettingsActionCreatorType
}

export type HeaderAdditionalPropsType = {
    language: 'en' | 'ru'
    theme: 'Dark' | 'Light'
}

export type HeaderContextPropsType = HeaderCallbacksType & HeaderPropsType & HeaderAdditionalPropsType