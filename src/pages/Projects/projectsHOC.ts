import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../redux/HOCTypes'
import {
    ProjectsCallbacksType,
    ProjectsContextPropsType,
    ProjectsExternalPropsType,
    ProjectsMapStateToPropsType
} from './ProjectsTypes'
import {
    getIsProjectsLoadingFrom,
    getIsProjectsSendingFrom,
    getProjectsFrom
} from '../../redux/projects/projectsSelectors'
import {getProjectsData} from '../../redux/projects/projectsReducer'
import {withLanguageFC, withThemeFC} from '../../redux/settings/settingsHOCs'
import {withToken} from '../../redux/auth/authHOCs'


export const withProjectsContextProps: HocFCToFCType = (Component: FC<ProjectsContextPropsType>) => {

    const MapStateToProps: ProjectsMapStateToPropsType = (state) => {
        return {
            projects: getProjectsFrom(state),
            isProjectsLoading: getIsProjectsLoadingFrom(state),
            isProjectsSending: getIsProjectsSendingFrom(state)
        }
    }

    const callbacks: ProjectsCallbacksType = {
        getProjects: getProjectsData
    }

    return compose<FC<ProjectsExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withLanguageFC,
        withThemeFC,
        withToken,
        memo
    )(Component)
}