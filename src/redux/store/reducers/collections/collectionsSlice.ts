import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {collectionHandler, collectionNamesHandler} from './collectionsThunkCreators'
import {CollectionsResponseType} from '../../../api/collectionsAPI'


type CollectionsStateType = {
    collectionNames: string[] | null
    currentCollection: string | null
    items: any[] | null
    collectionsLoadingError: string
    isCollectionsLoading: boolean

    count: number | null
    pages: number | null
    page: number | null
}

const initialState: CollectionsStateType = {
    collectionNames: null,
    currentCollection: null,
    items: null,
    collectionsLoadingError: '',
    isCollectionsLoading: false,

    count: null,
    pages: null,
    page: null
}

export const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        unsetItems(state: CollectionsStateType) {
            state.items = null
            state.currentCollection = null
            state.collectionNames = null
            state.count = null
            state.pages = null
            state.page = null
        }
    },
    extraReducers: {

        [collectionNamesHandler.pending.type]: (state: CollectionsStateType) => {
            state.isCollectionsLoading = true
        },
        [collectionNamesHandler.fulfilled.type]: (state: CollectionsStateType, action: PayloadAction<string[]>) => {
            state.collectionsLoadingError = ''
            state.collectionNames = action.payload
            state.isCollectionsLoading = false
        },
        [collectionNamesHandler.rejected.type]: (state: CollectionsStateType, action: PayloadAction<string>) => {
            state.collectionsLoadingError = action.payload
            state.isCollectionsLoading = false
        },

        [collectionHandler.pending.type]: (state: CollectionsStateType) => {
            state.isCollectionsLoading = true
        },
        [collectionHandler.fulfilled.type]: (state: CollectionsStateType, action: PayloadAction<{data: CollectionsResponseType, collectionName: string}>) => {
            state.collectionsLoadingError = ''
            state.currentCollection = action.payload.collectionName
            state.items = action.payload.data.items
            state.count = action.payload.data.count
            state.pages = action.payload.data.pages
            state.page = action.payload.data.page
            state.isCollectionsLoading = false
        },
        [collectionHandler.rejected.type]: (state: CollectionsStateType, action: PayloadAction<string>) => {
            state.collectionsLoadingError = action.payload
            state.isCollectionsLoading = false
        }

    }
})


export default collectionsSlice.reducer