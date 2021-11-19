import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../../redux/HOCTypes'
import {
    SwitchCallbacksType,
    SwitchContextPropsType,
    SwitchExternalPropsType,
    SwitchMapStateToPropsType
} from './SwitchTypes'
import {withThemeFC} from '../../../redux/settings/settingsHOCs'


export const withSwitchContextProps: HocFCToFCType = (Component: FC<SwitchContextPropsType>) => {

    const MapStateToProps: SwitchMapStateToPropsType = (state) => {
        return {

        }
    }

    const callbacks: SwitchCallbacksType = {

    }

    return compose<FC<SwitchExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        memo
    )(Component)
}