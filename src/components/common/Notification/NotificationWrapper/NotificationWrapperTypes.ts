import {StateType} from '../../../../redux/StateType'
import {ProjectsActionCreatorType} from '../../../../redux/projects/projectsTypes'


export type NotificationWrapperExternalPropsType = {
    child: JSX.Element
    disabled?: boolean
    leftBtnHandler: () => void
    rightBtnHandler: () => void
    isShown: boolean
    leftBtnLabel?: string
    rightBtnLabel?: string
}

export type NotificationWrapperPropsType = {

}

export type NotificationWrapperMapStateToPropsType = (state: StateType) => NotificationWrapperPropsType

export type NotificationWrapperCallbacksType = {
    setIsNotification: ProjectsActionCreatorType
}

export type NotificationWrapperAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
}

export type NotificationWrapperContextPropsType = NotificationWrapperCallbacksType & NotificationWrapperPropsType & NotificationWrapperAdditionalPropsType