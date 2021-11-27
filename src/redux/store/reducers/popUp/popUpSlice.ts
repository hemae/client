import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export type RenderingComponentType = 'AuthCard' | 'CreateRenameProject' | 'DeleteProject' | 'DeleteCollection' | 'DeleteItem'

export type PopUpOptionsType = {
    renderingComponent: RenderingComponentType | null
    props: any
}

type PopUpStateType = {
    popUpOptions: PopUpOptionsType
}

const initialState: PopUpStateType = {
    popUpOptions: {
        renderingComponent: null,
        props: null
    }
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        showPopUp(state: PopUpStateType, action: PayloadAction<PopUpOptionsType>) {
            state.popUpOptions = action.payload
        },
        closePopUp(state: PopUpStateType) {
            state.popUpOptions = {renderingComponent: null, props: null}
        }
    }
})


export default popUpSlice.reducer
