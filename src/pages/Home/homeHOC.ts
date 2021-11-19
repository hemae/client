import {FC} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../redux/HOCTypes'
import {getProjectsData} from '../../redux/projects/projectsReducer'
import {withLanguageFC, withThemeFC} from '../../redux/settings/settingsHOCs'
import {HomeCallbacksType, HomeContextPropsType, HomeExternalPropsType, HomeMapStateToPropsType} from './HomeTypes'


export const withHomeContextProps: HocFCToFCType = (Component: FC<HomeContextPropsType>) => {

    const MapStateToProps: HomeMapStateToPropsType = (state) => {
        return {

        }
    }

    const callbacks: HomeCallbacksType = {
        getProjectsData
    }

    return compose<FC<HomeExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withLanguageFC,
        withThemeFC
    )(Component)
}