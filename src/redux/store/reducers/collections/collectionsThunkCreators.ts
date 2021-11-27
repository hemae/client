import {createAsyncThunk} from '@reduxjs/toolkit'
import collectionsAPI, {
    CollectionNamesAxiosResponseType,
    CollectionsApiOptionsType,
    CollectionsAxiosResponseType
} from '../../../api/collectionsAPI'


type collectionNamesOptionsType = {
    apiEndpoint: (payload: CollectionsApiOptionsType) => Promise<CollectionNamesAxiosResponseType>
    payload: CollectionsApiOptionsType
}

export const collectionNamesHandler = createAsyncThunk(
    'collectionNamesHandler',
    async (options: collectionNamesOptionsType, thunkAPI) => {
        try {
            const response = await options.apiEndpoint(options.payload)
            return response.data.collectionNames
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export function getCollectionNames(payload: CollectionsApiOptionsType) {
    return collectionNamesHandler({
        apiEndpoint: collectionsAPI.getCollectionNames,
        payload
    })
}

export function deleteCollection(payload: CollectionsApiOptionsType) {
    return collectionNamesHandler({
        apiEndpoint: collectionsAPI.deleteCollection,
        payload
    })
}


type CollectionHandlerOptionsType = {
    apiEndpoint: (payload: CollectionsApiOptionsType) => Promise<CollectionsAxiosResponseType>
    payload: CollectionsApiOptionsType
}

export const collectionHandler = createAsyncThunk(
    'collectionHandler',
    async (options: CollectionHandlerOptionsType, thunkAPI) => {
        try {
            const response = await options.apiEndpoint(options.payload)
            return {data: response.data, collectionName: options.payload.data.collectionName}
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export function getCollection(payload: CollectionsApiOptionsType) {
    return collectionHandler({
        apiEndpoint: collectionsAPI.getCollection,
        payload
    })
}

export function create(payload: CollectionsApiOptionsType) {
    return collectionHandler({
        apiEndpoint: collectionsAPI.create,
        payload
    })
}

export function update(payload: CollectionsApiOptionsType) {
    return collectionHandler({
        apiEndpoint: collectionsAPI.update,
        payload
    })
}

export function deleteItem(payload: CollectionsApiOptionsType) {
    return collectionHandler({
        apiEndpoint: collectionsAPI.delete,
        payload
    })
}

