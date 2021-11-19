import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../../redux/HOCTypes'
import {
    AuthButtonCallbacksType,
    AuthButtonContextPropsType,
    AuthButtonExternalPropsType,
    AuthButtonMapStateToPropsType
} from './AuthButtonTypes'
import {getIsAuthenticatedFrom} from '../../../redux/auth/authSelectors'
import {withLanguageFC, withThemeFC} from '../../../redux/settings/settingsHOCs'
import {logout} from '../../../redux/auth/authReducer'


export const withAuthButtonContextProps: HocFCToFCType = (Component: FC<AuthButtonContextPropsType>) => {

    const MapStateToProps: AuthButtonMapStateToPropsType = (state) => {
        return {
            isAuthenticated: getIsAuthenticatedFrom(state)
        }
    }

    const callbacks: AuthButtonCallbacksType = {
        logout
    }

    return compose<FC<AuthButtonExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withLanguageFC,
        withThemeFC,
        memo
    )(Component)
}