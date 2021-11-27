import projectsAPI, {
    ProjectAxiosResponseType,
    ProjectsApiOptionsType,
    ProjectsAxiosResponseType
} from '../../../api/projectsAPI'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {authSlice} from '../auth/authSlice'


type ProjectsHandlerThunkCreatorOptionsType = {
    apiEndpoint: (payload: ProjectsApiOptionsType) => Promise<ProjectsAxiosResponseType>
    payload: ProjectsApiOptionsType
}

export const projectsHandlerThunkCreator = createAsyncThunk(
    'projectsHandler',
    async (options: ProjectsHandlerThunkCreatorOptionsType, thunkAPI) => {
        try {
            const response = await options.apiEndpoint(options.payload)
            return response.data.projects
        } catch (e: any) {
            if (e.response.data.message === 'Authorization error') {
                return thunkAPI.dispatch(authSlice.actions.logout())
            }
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getProjects = (payload: ProjectsApiOptionsType) => projectsHandlerThunkCreator({
    apiEndpoint: projectsAPI.getProjects,
    payload
})

export const createProject = (payload: ProjectsApiOptionsType) => projectsHandlerThunkCreator({
    apiEndpoint: projectsAPI.createProject,
    payload
})

export const renameProject = (payload: ProjectsApiOptionsType) => projectsHandlerThunkCreator({
    apiEndpoint: projectsAPI.renameProject,
    payload
})

export const deleteProject = (payload: ProjectsApiOptionsType) => projectsHandlerThunkCreator({
    apiEndpoint: projectsAPI.deleteProject,
    payload
})


type ProjectHandlerThunkCreatorOptionsType = {
    apiEndpoint: (payload: ProjectsApiOptionsType) => Promise<ProjectAxiosResponseType>
    payload: ProjectsApiOptionsType
}

export const projectHandlerThunkCreator = createAsyncThunk(
    'projectHandler',
    async (options: ProjectHandlerThunkCreatorOptionsType, thunkAPI) => {
        try {
            const response = await options.apiEndpoint(options.payload)
            return response.data.project
        } catch (e: any) {
            if (e.response.data.message === 'Authorization error') {
                return thunkAPI.dispatch(authSlice.actions.logout())
            }
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getProject = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.getProject,
    payload
})

export const shareProject = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.shareProject,
    payload
})
