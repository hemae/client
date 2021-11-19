import {FC, ComponentClass} from 'react'
import {connect} from 'react-redux'
import {StateType} from '../StateType'
import {getLanguageFrom, getThemeFrom} from './settingsSelectors'
import {HocComponentClassToFCType, HocFCToFCType} from '../HOCTypes'


//--------------------WITH-THEME--------------------

export const withThemeFC: HocFCToFCType = (Component: FC<any>) => {
    return connect(
        (state: StateType) => ({theme: getThemeFrom(state)}), {}
    )(Component)
}

export const withThemeComponentClass: HocComponentClassToFCType = (Component: ComponentClass<any>) => {
    return connect(
        (state: StateType) => ({theme: getThemeFrom(state)}), {}
    )(Component)
}

//--------------------WITH-LANGUAGE--------------------

export const withLanguageFC: HocFCToFCType = (Component: FC<any>) => {
    return connect(
        (state: StateType) => ({language: getLanguageFrom(state)}), {}
    )(Component)
}

export const withLanguageComponentClass: HocComponentClassToFCType = (Component: ComponentClass<any>) => {
    return connect(
        (state: StateType) => ({language: getLanguageFrom(state)}), {}
    )(Component)
}