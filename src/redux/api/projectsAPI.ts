import {AxiosResponse} from 'axios'
import AxiosApi from './AxiosApi'
import {Project} from '../models/Project'


export type ProjectsAxiosResponseType = AxiosResponse<{ projects: Project[] }>

export type ProjectsApiOptionsType = {
    token: string
    data?: {
        projectName?: string
        projectId?: string
    }
}

const api = new AxiosApi({basePath: '/api/projects'})

const ProjectsAPI = {
    getProjects({token}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse({path: '/', method: 'get', token})
    },
    createProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse({path: '/create', method: 'put', token, data})
    },
    renameProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse({path: '/rename', method: 'post', token, data})
    },
    deleteProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse({path: '/delete', method: 'post', token, data})
    },
}

export default ProjectsAPI