import {
    PRJCTS_SET_PROJECTS,
    PRJCTS_SET_IS_PROJECTS_LOADING,
    PRJCTS_SET_IS_PROJECTS_SENDING,
    PRJCTS_SET_IS_NOTIFICATION
} from '../actionTypes'
import {Project} from '../models/Project'

//------ If you add a new prop or action, you must add some code in types with mark 'Dynamic-0'
//and you should potentially add some code in types with mark 'Dynamic'


//********************REDUCER-TYPES********************//


export type ProjectsStateType = {
    readonly projects: Project[]
    readonly isProjectsLoading: boolean
    readonly isProjectsSending: boolean
    readonly isNotification: boolean
}       //Dynamic: Add new prop in state

export type ProjectsPayloadType = {
    projects?: Project[]
    isProjectsLoading?: boolean
    isProjectsSending?: boolean
    isNotification?: boolean
}       //Dynamic: Add new prop-payload in action

export type ProjectsActionType = {
    type: typeof PRJCTS_SET_PROJECTS |
        typeof PRJCTS_SET_IS_PROJECTS_LOADING |
        typeof PRJCTS_SET_IS_PROJECTS_SENDING |
        typeof PRJCTS_SET_IS_NOTIFICATION
    payload?: ProjectsPayloadType
}       //Dynamic-0: Add new action CONSTANT

export type ProjectsHandleType = (state: ProjectsStateType, action: ProjectsActionType) => ProjectsStateType

export type ProjectsHandlersType = {
    [PRJCTS_SET_PROJECTS]: ProjectsHandleType
    [PRJCTS_SET_IS_PROJECTS_LOADING]: ProjectsHandleType
    [PRJCTS_SET_IS_PROJECTS_SENDING]: ProjectsHandleType
    [PRJCTS_SET_IS_NOTIFICATION]: ProjectsHandleType
    DEFAULT: ProjectsHandleType
}       //Dynamic-0: Add new handle

export type ProjectsActionCreatorType = (prop?: any) => ProjectsActionType

export type ProjectsReducerType = (state: ProjectsStateType, action: ProjectsActionType) => ProjectsStateType