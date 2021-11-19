import React, {FC, useEffect} from 'react'
import styles from './App.module.css'
import {Provider} from 'react-redux'
import store from '../redux/store'
// import store from '../redux/store/store'
import {withAppContextProps} from './appHOC'
import {AppContextPropsType} from './AppTypes'
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes/Routes'

const AppComponent: FC<AppContextPropsType> = ({
                                                   theme,
                                                   login,
                                                   setTheme,
                                                   setLanguage,
                                                   isAuthenticated
                                               }) => {

    const colorStyles = require(`./App${theme}.module.css`)

    useEffect(() => {
        if (localStorage.getItem('theme') !== null) {
            setTheme(localStorage.getItem('theme'))
        }
        if (localStorage.getItem('language') !== null) {
            setLanguage(localStorage.getItem('language'))
        }
    }, [setTheme, setLanguage])

    useEffect(() => {
        login()
    }, [login])

    return (
        <div className={`${styles.app} + ${colorStyles.app}`}>
            <Routes/>
        </div>
    )
}

const AppWithProps: FC<{}> = withAppContextProps(AppComponent)

export const App: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWithProps/>
            </Provider>
        </BrowserRouter>
    )
}
