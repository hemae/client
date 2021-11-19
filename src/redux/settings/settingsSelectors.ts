import {StateType} from '../StateType'


export const getThemeFrom = (state: StateType): string => {
    return state.settings.theme
}

export const getLanguageFrom = (state: StateType): string => {
    return state.settings.language
}
