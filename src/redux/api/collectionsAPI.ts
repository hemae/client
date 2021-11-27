import AxiosApi from './AxiosApi'
import {AxiosResponse} from 'axios'


export type CollectionsResponseType = {
    count: number
    pages: number
    page: number | null
    items: any[]
}
export type CollectionsAxiosResponseType= AxiosResponse<CollectionsResponseType>

export type CollectionNamesResponseType = { collectionNames: string[] }
export type CollectionNamesAxiosResponseType = AxiosResponse<CollectionNamesResponseType>

export type CollectionsApiOptionsType = {
    token: string
    data: {
        projectId: string
        collectionName?: string
        item?: any
        itemId?: string
        update?: any
        page?: number
    }
}

const api = new AxiosApi({basePath: '/api/client/collections'})


const collectionsAPI = {
    getCollectionNames({token, data}: CollectionsApiOptionsType): Promise<CollectionNamesAxiosResponseType> {
        return api.getPromiseResponse<CollectionNamesResponseType>({path: `/${data.projectId}`, method: 'get', token})
    },
    deleteCollection({token, data}: CollectionsApiOptionsType): Promise<CollectionNamesAxiosResponseType> {
        return api.getPromiseResponse<CollectionNamesResponseType>({path: '/deleteCollection', method: 'post', token, data})
    },
    getCollection({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse<CollectionsResponseType>({path: `/${data.projectId}/${data.collectionName}/${data.page}`, method: 'get', token})
    },
    create({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse<CollectionsResponseType>({path: '/create', method: 'put', token, data})
    },
    update({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse<CollectionsResponseType>({path: `/update/${data.page}`, method: 'post', token, data})
    },
    delete({token, data}: CollectionsApiOptionsType): Promise<CollectionsAxiosResponseType> {
        return api.getPromiseResponse<CollectionsResponseType>({path: `/delete/${data.page}`, method: 'post', token, data})
    }
}

export default collectionsAPI