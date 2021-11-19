import {FC} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {AppCallbacksType, AppContextPropsType, AppMapStateToPropsType} from './AppTypes'
import {HocFCToFCType} from '../redux/HOCTypes'
import {setLanguage, setTheme} from '../redux/settings/settingsReducer'
import {login} from '../redux/auth/authReducer'
import {getIsAuthenticatedFrom} from '../redux/auth/authSelectors'
import {withThemeFC} from '../redux/settings/settingsHOCs'


export const withAppContextProps: HocFCToFCType = (Component: FC<AppContextPropsType>) => {

    const MapStateToProps: AppMapStateToPropsType = (state) => {
        return {
            isAuthenticated: getIsAuthenticatedFrom(state),
        }
    }

    const callbacks: AppCallbacksType = {
        setTheme,
        setLanguage,
        login
    }

    return compose<FC<{}>>(
        connect(MapStateToProps, callbacks),
        withThemeFC
    )(Component)
}