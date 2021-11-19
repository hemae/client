import AxiosApi from './AxiosApi'
import {AxiosResponse} from 'axios'


export type CollectionsAxiosResponseType = AxiosResponse<{ item: object }>
export type CollectionsDeleteAxiosResponseType = AxiosResponse<{ message: string }>

export type CollectionsApiOptionsType = {
    token: string
    data: {
        projectId: string
        collectionName: string
        item?: object
        itemId?: string
        update?: object
    }
}

const api = new AxiosApi({basePath: '/api/client/collections'})

// create - payload: { projectId: string, collectionName: string, item: any, token: string }
// update - payload: {projectId: string, collectionName: string, itemId: string, update: any, token: string}
// delete - payload: {projectId: string, collectionName: string, itemId: string, token: string}
const collectionsAPI = {
    create({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse({path: '/create', method: 'put', token, data})
    },
    update({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse({path: '/update', method: 'post', token, data})
    },
    delete({token, data}: CollectionsApiOptionsType): Promise<CollectionsDeleteAxiosResponseType> {
        return api.getPromiseResponse({path: '/delete', method: 'post', token, data})
    }
}

export default collectionsAPI