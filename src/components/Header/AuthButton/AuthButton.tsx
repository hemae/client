import React, {FC, useState} from 'react'
import styles from './AuthButton.module.css'
import {withAuthButtonContextProps} from './authButtonHOC'
import {AuthButtonContextPropsType, AuthButtonExternalPropsType} from './AuthButtonTypes'
import {authButtonLabels, AuthButtonLabelsType} from './authButtonLabels'
import AuthCard from '../../AuthCard/AuthCard'


const AuthButton: FC<AuthButtonContextPropsType & AuthButtonExternalPropsType> = ({
                                                                                      language,
                                                                                      theme,
                                                                                      logout,
                                                                                      isAuthenticated
                                                                                  }) => {

    const colorStyles = require(`./AuthButton${theme}.module.css`)
    const labels: AuthButtonLabelsType = authButtonLabels[language]

    const [isAuthCardShown, setIsAuthCardShown] = useState<boolean>(false)

    const onAuthButtonClick = (): void => {
        if (isAuthenticated) {
            logout()
        } else {
            setIsAuthCardShown(true)
        }
    }

    return (
        <>
            <div className={`${styles.authButton} + ${colorStyles.authButton}`}
                 onClick={onAuthButtonClick}
            >
                {isAuthenticated ? labels.signOut : labels.signIn}
            </div>

            {isAuthCardShown && <AuthCard isShown={isAuthCardShown} type={'signIn'} closeCard={() => setIsAuthCardShown(false)}/>}
        </>

    )
}

export default withAuthButtonContextProps(AuthButton) as FC<AuthButtonExternalPropsType>