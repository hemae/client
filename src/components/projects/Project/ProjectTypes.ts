import {StateType} from '../../../redux/StateType'
import {Project} from '../../../redux/models/Project'


export type ProjectExternalPropsType = {
    project: Project
}

export type ProjectPropsType = {

}

export type ProjectMapStateToPropsType = (state: StateType) => ProjectPropsType

export type ProjectCallbacksType = {
    renameProject: any
    deleteProject: any
}

export type ProjectAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
    token: string
}

export type ProjectContextPropsType = ProjectCallbacksType & ProjectPropsType & ProjectAdditionalPropsType