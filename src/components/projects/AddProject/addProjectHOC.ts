import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    AddProjectCallbacksType, AddProjectContextPropsType,
    AddProjectExternalPropsType, AddProjectMapStateToPropsType
} from './AddProjectTypes'
import {HocFCToFCType} from '../../../redux/HOCTypes'
import {createProject} from '../../../redux/projects/projectsReducer'
import {getIsNotificationFrom} from '../../../redux/projects/projectsSelectors'
import {withLanguageFC, withThemeFC} from '../../../redux/settings/settingsHOCs'
import {withToken} from '../../../redux/auth/authHOCs'


export const withAddProjectContextProps: HocFCToFCType = (Component: FC<AddProjectContextPropsType>) => {

    const MapStateToProps: AddProjectMapStateToPropsType = (state) => {
        return {
            isNotification: getIsNotificationFrom(state)
        }
    }

    const callbacks: AddProjectCallbacksType = {
        createProject
    }


    return compose<FC<AddProjectExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        withLanguageFC,
        memo
    )(Component)
}