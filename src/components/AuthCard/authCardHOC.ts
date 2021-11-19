import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {
    AuthCardCallbacksType,
    AuthCardContextPropsType,
    AuthCardExternalPropsType,
    AuthCardMapStateToPropsType
} from './AuthCardTypes'
import {getAuthErrorFrom, getAuthIsLoadingFrom, getAuthNoticeFrom} from '../../redux/auth/authSelectors'
import {
    signIn,
    signUp,
    setError,
    setNotice
} from '../../redux/auth/authReducer'
import {HocFCToFCType} from '../../redux/HOCTypes'
import {withLanguageFC, withThemeFC} from '../../redux/settings/settingsHOCs'


export const withAuthCardContextProps: HocFCToFCType = (Component: FC<AuthCardContextPropsType>) => {

    const MapStateToProps: AuthCardMapStateToPropsType = (state) => {
        return {
            isLoading: getAuthIsLoadingFrom(state),
            error: getAuthErrorFrom(state),
            notice: getAuthNoticeFrom(state)
        }
    }

    const callbacks: AuthCardCallbacksType = {
        signUp,
        signIn,
        setError,
        setNotice
    }

    return compose<FC<AuthCardExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withThemeFC,
        withLanguageFC,
        memo
    )(Component)
}