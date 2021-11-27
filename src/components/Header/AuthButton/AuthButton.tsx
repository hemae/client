import React, {FC, memo} from 'react'
import styles from './AuthButton.module.css'
import {authButtonLabels, AuthButtonLabelsType} from './authButtonLabels'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {authSlice} from '../../../redux/store/reducers/auth/authSlice'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


const AuthButton: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {isAuthenticated} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./AuthButton${theme}.module.css`)
    const labels: AuthButtonLabelsType = authButtonLabels[language]

    const onAuthButtonClick = (): void => {
        if (isAuthenticated) {
            dispatch(authSlice.actions.logout())
        } else {
            dispatch(popUpSlice.actions.showPopUp({
                renderingComponent: 'AuthCard',
                props: {
                    type: 'signIn'
                }
            }))
        }
    }

    return (
        <div
            className={`${styles.authButton} + ${colorStyles.authButton}`}
            onClick={onAuthButtonClick}
        >
            {isAuthenticated ? labels.signOut : labels.signIn}
        </div>
    )
}

export default memo(AuthButton)