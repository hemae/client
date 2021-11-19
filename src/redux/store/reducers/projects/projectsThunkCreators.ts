import projectsAPI, {ProjectsApiOptionsType, ProjectsAxiosResponseType} from '../../../api/projectsAPI'
import {createAsyncThunk} from '@reduxjs/toolkit'


type ProjectHandlerThunkCreatorOptionsType = {
    apiEndpoint: (payload: ProjectsApiOptionsType) => Promise<ProjectsAxiosResponseType>
    payload: ProjectsApiOptionsType
}

export const projectHandlerThunkCreator = createAsyncThunk(
    'projectHandler',
    async (options: ProjectHandlerThunkCreatorOptionsType, thunkAPI) => {
        try {
            const response: ProjectsAxiosResponseType = await options.apiEndpoint(options.payload)
            return response.data.projects
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const getProjects = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.getProjects,
    payload
})

export const createProject = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.createProject,
    payload
})

export const renameProject = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.renameProject,
    payload
})

export const deleteProject = (payload: ProjectsApiOptionsType) => projectHandlerThunkCreator({
    apiEndpoint: projectsAPI.deleteProject,
    payload
})

export type GetProjectsType = (payload: { token: string }) => void
export type CreateProjectType = (payload: { token: string, data: { projectName: string } }) => void
export type RenameProjectType = (payload: { token: string, data: { projectId: string, projectName: string } }) => void
export type DeleteProjectType = (payload: { token: string, data: { projectId: string } }) => void
