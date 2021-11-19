import {FC} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    EditToolsCallbacksType, EditToolsContextPropsType, EditToolsExternalPropsType, EditToolsMapStateToPropsType
} from './EditToolsTypes'
import {withLanguageFC, withThemeFC} from '../../../../redux/settings/settingsHOCs'
import {HocFCToFCType} from '../../../../redux/HOCTypes'


export const withEditToolsContextProps: HocFCToFCType = (Component: FC<EditToolsContextPropsType>) => {

    const MapStateToProps: EditToolsMapStateToPropsType = (state) => {
        return {

        }
    }

    const callbacks: EditToolsCallbacksType = {

    }

    return compose<FC<EditToolsExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        withLanguageFC
    )(Component)
}