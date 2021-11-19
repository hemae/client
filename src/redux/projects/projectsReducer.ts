import {
    PRJCTS_SET_IS_NOTIFICATION,
    PRJCTS_SET_IS_PROJECTS_LOADING,
    PRJCTS_SET_IS_PROJECTS_SENDING,
    PRJCTS_SET_PROJECTS
} from '../actionTypes'
import {
    ProjectsActionCreatorType,
    ProjectsHandlersType,
    ProjectsHandleType,
    ProjectsReducerType,
    ProjectsStateType
} from './projectsTypes'
import {Project} from '../models/Project'
import {DispatchType, ThunkCreatorType} from '../ThunkTypes'
import {AxiosResponse} from 'axios'
import projectsAPI from '../api/projectsAPI'


//--------- Before changing or creating any props, handles or functions,
// DESIGN OR REDESIGN CORRESPONDING TYPES in 'actionTypes.ts', 'chatTypes.ts' ---//

const projectsHandlers: ProjectsHandlersType = {
    [PRJCTS_SET_PROJECTS]: (state, action) => ({
        ...state,
        projects: action.payload?.projects!
    }),
    [PRJCTS_SET_IS_PROJECTS_LOADING]: (state, action) => ({
        ...state,
        isProjectsLoading: action.payload?.isProjectsLoading!
    }),
    [PRJCTS_SET_IS_PROJECTS_SENDING]: (state, action) => ({
        ...state,
        isProjectsSending: action.payload?.isProjectsSending!
    }),
    [PRJCTS_SET_IS_NOTIFICATION]: (state, action) => ({
        ...state,
        isNotification: action.payload?.isNotification!
    }),
    DEFAULT: state => state
}

const initialState: ProjectsStateType = {
    projects: [],
    isProjectsLoading: false,
    isProjectsSending: false,
    isNotification: false
}

export const projectsReducer: ProjectsReducerType = (state = initialState, action) => {
    const handle: ProjectsHandleType = projectsHandlers[action.type] || projectsHandlers.DEFAULT
    return handle(state, action)
}

//------------------ACTION-CREATORS------------------

export const setProjects: ProjectsActionCreatorType = (projects: Project[]) => ({
    type: PRJCTS_SET_PROJECTS,
    payload: {projects}
})

export const setIsProjectsLoading: ProjectsActionCreatorType = (isProjectsLoading: boolean) => ({
    type: PRJCTS_SET_IS_PROJECTS_LOADING,
    payload: {isProjectsLoading}
})

export const setIsProjectsSending: ProjectsActionCreatorType = (isProjectsSending: boolean) => ({
    type: PRJCTS_SET_IS_PROJECTS_SENDING,
    payload: {isProjectsSending}
})

export const setIsNotification: ProjectsActionCreatorType = (isNotification: boolean) => ({
    type: PRJCTS_SET_IS_NOTIFICATION,
    payload: {isNotification}
})

//------------------THUNK-CREATORS------------------

export const getProjectsData: ThunkCreatorType = (token: string) => async (dispatch) => {
    dispatch(setIsProjectsLoading(true))
    try {
        const response: AxiosResponse = await projectsAPI.getProjects({token})
        dispatch(setProjects(response.data.projects))
        dispatch(setIsProjectsLoading(false))
    } catch (e) {
        dispatch(setIsProjectsLoading(false))
        throw e
    }
}

const updateProjects = async (payload: {
    dispatch: DispatchType
    apiFunction: any
    payload: Object
}) => {
    payload.dispatch(setIsProjectsSending(true))
    try {
        const response: AxiosResponse = await payload.apiFunction(payload.payload)
        payload.dispatch(setProjects(response.data.projects))
        payload.dispatch(setIsProjectsSending(false))
    } catch (e) {
        payload.dispatch(setIsProjectsSending(false))
        throw e
    }
}

export const createProject: ThunkCreatorType = (payload: {projectName: string, token: string}) => async (dispatch) => {
    await updateProjects({
        dispatch,
        apiFunction: projectsAPI.createProject,
        payload
    })
}

export const deleteProject: ThunkCreatorType = (payload: {projectId: string, token: string}) => async (dispatch) => {
    await updateProjects({
        dispatch,
        apiFunction: projectsAPI.deleteProject,
        payload
    })
}

export const renameProject: ThunkCreatorType = (payload: {projectName: string, projectId: string, token: string}) => async (dispatch) => {
    await updateProjects({
        dispatch,
        apiFunction: projectsAPI.renameProject,
        payload
    })
}
