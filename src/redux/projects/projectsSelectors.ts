import {StateType} from '../StateType'
import {Project} from '../models/Project'


export const getProjectsFrom = (state: StateType): Project[] => {
    return state.projects.projects
}

export const getIsProjectsLoadingFrom = (state: StateType): boolean => {
    return state.projects.isProjectsLoading
}

export const getIsProjectsSendingFrom = (state: StateType): boolean => {
    return state.projects.isProjectsSending
}

export const getIsNotificationFrom = (state: StateType): boolean => {
    return state.projects.isNotification
}