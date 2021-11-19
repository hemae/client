import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    ProjectCallbacksType,
    ProjectContextPropsType,
    ProjectExternalPropsType,
    ProjectMapStateToPropsType
} from './ProjectTypes'
import {HocFCToFCType} from '../../../redux/HOCTypes'
import {deleteProject, renameProject} from '../../../redux/projects/projectsReducer'
import {withLanguageFC, withThemeFC} from '../../../redux/settings/settingsHOCs'
import {withToken} from '../../../redux/auth/authHOCs'


export const withProjectContextProps: HocFCToFCType = (Component: FC<ProjectContextPropsType>) => {

    const MapStateToProps: ProjectMapStateToPropsType = (state) => {
        return {

        }
    }

    const callbacks: ProjectCallbacksType = {
        renameProject,
        deleteProject
    }

    return compose<FC<ProjectExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        withLanguageFC,
        withToken,
        memo
    )(Component)
}