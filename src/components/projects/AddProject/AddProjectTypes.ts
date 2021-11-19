import {StateType} from '../../../redux/StateType'


export type AddProjectExternalPropsType = {

}

export type AddProjectPropsType = {
    isNotification: boolean
}

export type AddProjectMapStateToPropsType = (state: StateType) => AddProjectPropsType

export type AddProjectCallbacksType = {
    createProject: any
}

export type AddProjectAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
}

export type AddProjectContextPropsType = AddProjectCallbacksType & AddProjectPropsType & AddProjectAdditionalPropsType