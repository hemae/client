import {StateType} from '../../../../redux/StateType'


export type EditToolsExternalPropsType = {
    isEditBarShown: boolean
    setIsInputNotificationShown: any
    setIsDeleteNotificationShown: any
}

export type EditToolsPropsType = {

}

export type EditToolsMapStateToPropsType = (state: StateType) => EditToolsPropsType

export type EditToolsCallbacksType = {

}

export type EditToolsAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
}

export type EditToolsContextPropsType = EditToolsCallbacksType & EditToolsPropsType & EditToolsAdditionalPropsType