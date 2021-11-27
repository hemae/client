import {AxiosResponse} from 'axios'
import AxiosApi from './AxiosApi'
import {Project} from '../models/Project'


export type ProjectsResponseType = { projects: Project[] }
export type ProjectsAxiosResponseType = AxiosResponse<ProjectsResponseType>

export type ProjectResponseType = { project: Project }
export type ProjectAxiosResponseType = AxiosResponse<ProjectResponseType>

export type ProjectsApiOptionsType = {
    token: string
    data?: {
        projectName?: string
        projectId?: string
    }
}

const api = new AxiosApi({basePath: '/api/projects'})

const ProjectsAPI = {
    getProject({token, data}: ProjectsApiOptionsType): Promise<ProjectAxiosResponseType> {
        return api.getPromiseResponse<ProjectResponseType>({path: `/${data!.projectId}`, method: 'get', token})
    },
    getProjects({token}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse<ProjectsResponseType>({path: '/', method: 'get', token})
    },
    createProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse<ProjectsResponseType>({path: '/create', method: 'put', token, data})
    },
    renameProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse<ProjectsResponseType>({path: '/rename', method: 'post', token, data})
    },
    deleteProject({token, data}: ProjectsApiOptionsType): Promise<ProjectsAxiosResponseType> {
        return api.getPromiseResponse<ProjectsResponseType>({path: '/delete', method: 'post', token, data})
    },
    shareProject({token, data}: ProjectsApiOptionsType): Promise<ProjectAxiosResponseType> {
        return api.getPromiseResponse<ProjectResponseType>({path: `/share/${data!.projectId}`, method: 'put', token})
    }
}

export default ProjectsAPI