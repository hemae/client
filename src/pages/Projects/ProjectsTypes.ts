import {StateType} from '../../redux/StateType'
import {Project} from '../../redux/models/Project'


export type ProjectsExternalPropsType = {

}

export type ProjectsPropsType = {
    projects: Project[]
    isProjectsLoading: boolean
    isProjectsSending: boolean
}

export type ProjectsMapStateToPropsType = (state: StateType) => ProjectsPropsType

export type ProjectsCallbacksType = {
    getProjectsData: any
}

export type ProjectsAdditionalPropsType = {
    language: 'en' | 'ru'
    theme: 'Dark' | 'Light'
    token: string
}

export type ProjectsContextPropsType = ProjectsCallbacksType & ProjectsPropsType & ProjectsAdditionalPropsType