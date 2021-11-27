import React, {FC, memo, useEffect, useState} from 'react'
import styles from './Header.module.css'
import {headerLabels, HeaderLabelsType} from './headerLabels'
import AuthButton from './AuthButton/AuthButton'
import Switch from '../common/Switch/Switch'
import * as FiIcons from 'react-icons/fi'
import {NavLink} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {settingsSlice} from '../../redux/store/reducers/settings/settingsSlice'
import {LanguageType, ThemeType} from '../../redux/models/settings'
import {PayloadAction} from '@reduxjs/toolkit'
import {popUpSlice} from '../../redux/store/reducers/popUp/popUpSlice'
import useWindowDimensions from '../../hooks/useWindowDimensions'


const Tools: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {isAuthenticated, authUserData} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./Header${theme}.module.css`)
    const labels: HeaderLabelsType = headerLabels[language]

    const setTheme = (theme: ThemeType): PayloadAction<ThemeType> => dispatch(settingsSlice.actions.setTheme(theme))
    const setLanguage = (language: LanguageType): PayloadAction<LanguageType> => dispatch(settingsSlice.actions.setLanguage(language))

    const onRegButtonClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'AuthCard',
            props: {
                type: 'signUp'
            }
        }))
    }

    return (
        <div className={`${styles.tools} + ${colorStyles.tools}`}>

            <Switch
                setProp={setTheme}
                prop1={'Light'}
                prop2={'Dark'}
                currentProp={theme}
                icons={
                    {
                        icon1: <FiIcons.FiSun/>,
                        icon2: <FiIcons.FiMoon/>
                    }
                }
            />

            <Switch
                setProp={setLanguage}
                prop1={'en'}
                prop2={'ru'}
                currentProp={language}
                icons={
                    {
                        icon1: <span>en</span>,
                        icon2: <span>ru</span>
                    }
                }
                isText={true}
            />

            {!isAuthenticated &&
            <div
                className={`${styles.signUp} + ${colorStyles.signUp}`}
                onClick={onRegButtonClick}
            >{labels.signUp}</div>}

            {authUserData &&
            <div className={`${styles.signAs} + ${colorStyles.signAs}`}>
                <span>{labels.signAs}</span>
                <span style={{fontWeight: 'bold'}}>{authUserData.login}</span>
            </div>}

            <AuthButton/>

        </div>
    )
}


type PageType = '/' | '/projects' | '/docs'

type LinkPropsType = {
    path: PageType
}

const Link: FC<LinkPropsType> = ({path}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Header${theme}.module.css`)
    const labels: HeaderLabelsType = headerLabels[language]

    return (
        <NavLink
            to={path} exact
            activeClassName={`${styles.active} + ${colorStyles.active}`}
            className={`${styles.link} + ${colorStyles.link}`}
        >
            {labels[path]}
        </NavLink>
    )
}


const Header: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {isAuthenticated} = useAppSelector(state => state.authReducer)

    const colorStyles = require(`./Header${theme}.module.css`)
    const labels: HeaderLabelsType = headerLabels[language]

    const {width} = useWindowDimensions()

    const borderlineWidth: number = language === 'en'
        ? isAuthenticated
            ? 800
            : 700
        : isAuthenticated
            ? 965
            : 865

    const [isToolsHidden, setIsToolsHidden] = useState<boolean>(width < borderlineWidth)
    const [isToolsShown, setIsToolsShown] = useState<boolean>(false)

    useEffect(() => {
        if (width < borderlineWidth && !isToolsHidden) {
            setIsToolsHidden(true)
            setIsToolsShown(false)
        }
        if (width > borderlineWidth && isToolsHidden) {
            setIsToolsHidden(false)
            setIsToolsShown(true)
        }
    }, [width])

    const onShowToolsClick = (): void => {
        setIsToolsShown(prev => !prev)
    }

    const onToolsLeave = (): void => {
        setIsToolsShown(false)
    }

    return (
        <div
            className={`${styles.header} + ${colorStyles.header}`}
            style={isToolsHidden ? {
                position: 'relative'
            } : {}}
        >

            <div className={styles.navBar}>
                <Link path='/'/>
                {isAuthenticated && <Link path='/projects'/>}
                <Link path='/docs'/>
            </div>

            {isToolsHidden &&
            <div
                className={`${styles.showTools} + ${colorStyles.showTools}`}
                onClick={onShowToolsClick}
            >{isToolsShown ? <FiIcons.FiChevronUp/> : <FiIcons.FiChevronDown/>}</div>}

            {!isToolsHidden && <Tools/>}

            {isToolsHidden && isToolsShown &&
            <div
                className={`${styles.toolsContainer} + ${colorStyles.toolsContainer}`}
                onMouseLeave={onToolsLeave}
            ><Tools/></div>}

        </div>
    )
}

export default memo(Header)