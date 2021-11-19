import {StateType} from '../../redux/StateType'


export type HomeExternalPropsType = {

}

export type HomePropsType = {

}

export type HomeMapStateToPropsType = (state: StateType) => HomePropsType

export type HomeCallbacksType = {
    getProjectsData: any
}

export type HomeAdditionalPropsType = {
    language: 'en' | 'ru'
    theme: 'Dark' | 'Light'
}

export type HomeContextPropsType = HomeCallbacksType & HomePropsType & HomeAdditionalPropsType