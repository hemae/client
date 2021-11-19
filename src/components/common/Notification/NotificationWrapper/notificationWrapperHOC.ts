import {FC} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../../../redux/HOCTypes'
import {
    NotificationWrapperCallbacksType, NotificationWrapperContextPropsType,
    NotificationWrapperExternalPropsType,
    NotificationWrapperMapStateToPropsType
} from './NotificationWrapperTypes'
import {setIsNotification} from '../../../../redux/projects/projectsReducer'
import {withLanguageFC, withThemeFC} from '../../../../redux/settings/settingsHOCs'


export const withNotificationWrapperContextProps: HocFCToFCType = (Component: FC<NotificationWrapperContextPropsType>) => {

    const MapStateToProps: NotificationWrapperMapStateToPropsType = (state) => {
        return {

        }
    }

    const callbacks: NotificationWrapperCallbacksType = {
        setIsNotification
    }

    return compose<FC<NotificationWrapperExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        withLanguageFC
    )(Component)
}