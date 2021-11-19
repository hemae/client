import React, {FC, useState} from 'react'
import styles from './Header.module.css'
import {headerLabels, HeaderLabelsType} from './headerLabels'
import {HeaderContextPropsType, HeaderExternalPropsType} from './HeaderTypes'
import {withHeaderContextProps} from './headerHOC'
import AuthButton from './AuthButton/AuthButton'
import Switch from '../common/Switch/Switch'
import * as FiIcons from 'react-icons/fi'
import {NavLink} from 'react-router-dom'
import AuthCard from '../AuthCard/AuthCard'


const Header: FC<HeaderContextPropsType & HeaderExternalPropsType> = ({
                                                                          setTheme,
                                                                          setLanguage,
                                                                          language,
                                                                          theme,
                                                                          isAuthenticated
                                                                      }) => {

    const colorStyles = require(`./Header${theme}.module.css`)
    const labels: HeaderLabelsType = headerLabels[language]

    const [isAuthCardShown, setIsAuthCardShown] = useState<boolean>(false)

    const onRegButtonClick = (): void => {
        setIsAuthCardShown(true)
    }

    return (
        <>

            <div className={`${styles.header} + ${colorStyles.header}`}>

                <div className={styles.navBar}>
                    <NavLink to='/' exact className={`${styles.link} + ${colorStyles.link}`}>
                        {labels.home}
                    </NavLink>

                    {isAuthenticated && <NavLink to='/projects' className={`${styles.link} + ${colorStyles.link}`}>
                        {labels.projects}
                    </NavLink>}

                </div>

                <div className={styles.authBar}>
                    <Switch setProp={setTheme}
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
                    <Switch setProp={setLanguage}
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
                    <div className={`${styles.signUp} + ${colorStyles.signUp}`}
                         onClick={onRegButtonClick}
                    >{labels.signUp}</div>}
                    <AuthButton/>
                </div>

            </div>

            {isAuthCardShown && <AuthCard isShown={isAuthCardShown} type={'signUp'} closeCard={() => setIsAuthCardShown(false)}/>}
        </>

    )
}

export default withHeaderContextProps(Header) as FC<HeaderExternalPropsType>