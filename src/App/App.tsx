import React, {FC, useEffect} from 'react'
import styles from './App.module.css'
import {Provider} from 'react-redux'
import store from '../redux/store/store'
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes/Routes'
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux'
import {settingsSlice} from '../redux/store/reducers/settings/settingsSlice'
import {login} from '../redux/store/reducers/auth/authThunkCreators'
import {LanguageType, ThemeType} from '../redux/models/settings'
import {APP_SIDE_PADDING} from './stylesConsts'
import Header from '../components/Header/Header'
import PopUp from '../components/PopUp/PopUp'
import Loader from '../components/common/Loader/Loader'


const Content: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {popUpOptions} = useAppSelector(state => state.popUpReducer)
    const {isAuthenticated} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./App${theme}.module.css`)

    useEffect(() => {
        if (localStorage.getItem('theme') !== null) {
            dispatch(settingsSlice.actions.setTheme(localStorage.getItem('theme') as ThemeType))
        }
        if (localStorage.getItem('language') !== null) {
            dispatch(settingsSlice.actions.setLanguage(localStorage.getItem('language') as LanguageType))
        }
    }, [])

    useEffect(() => {
        dispatch(login())
    }, [login])

    if (!isAuthenticated && localStorage.getItem('token')) {
        return (
            <div
                className={`${styles.app} + ${colorStyles.app}`}
                style={{
                    justifyContent: 'center'
                }}
            ><Loader size={40}/></div>
        )
    }

    return (
        <div
            className={`${styles.app} + ${colorStyles.app}`}
            style={{
                width: `calc(100vw - ${APP_SIDE_PADDING * 2}px)`,
                padding: `0 ${APP_SIDE_PADDING}px`
            }}
        >
            <Header/>
            <Routes/>
            {popUpOptions.renderingComponent && <PopUp/>}
        </div>
    )
}

export default () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Content/>
            </Provider>
        </BrowserRouter>
    )
}
