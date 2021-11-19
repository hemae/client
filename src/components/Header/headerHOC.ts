import {FC} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../redux/HOCTypes'
import {withLanguageFC, withThemeFC} from '../../redux/settings/settingsHOCs'
import {
    HeaderCallbacksType,
    HeaderContextPropsType,
    HeaderExternalPropsType,
    HeaderMapStateToPropsType
} from './HeaderTypes'
import {setLanguage, setTheme} from '../../redux/settings/settingsReducer'
import {getIsAuthenticatedFrom} from '../../redux/auth/authSelectors'


export const withHeaderContextProps: HocFCToFCType = (Component: FC<HeaderContextPropsType>) => {

    const MapStateToProps: HeaderMapStateToPropsType = (state) => {
        return {
            isAuthenticated: getIsAuthenticatedFrom(state)
        }
    }

    const callbacks: HeaderCallbacksType = {
        setTheme,
        setLanguage
    }

    return compose<FC<HeaderExternalPropsType>>(
        connect(MapStateToProps, callbacks),
        withLanguageFC,
        withThemeFC
    )(Component)
}