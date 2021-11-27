import React, {FC, memo, useEffect, useState} from 'react'
import {homeLabels, HomeLabelsType} from './homeLabels'
import styles from './Home.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {Redirect} from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import {NavLink} from 'react-router-dom'
import {popUpSlice} from '../../redux/store/reducers/popUp/popUpSlice'


const Home: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {notice, isAuthenticated} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./Home${theme}.module.css`)
    const labels: HomeLabelsType = homeLabels[language]

    const [isWelcomeShown, setIsWelcomeShown] = useState<boolean>(false)
    const [isSlogan, setIsSlogan] = useState<boolean>(false)

    useEffect(() => {
        setIsWelcomeShown(true)
        setTimeout(() => {
            setIsSlogan(true)
        }, 1000)
    }, [])

    const onSignInClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'AuthCard',
            props: {
                type: 'signIn'
            }
        }))
    }

    const onSignUpClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'AuthCard',
            props: {
                type: 'signUp'
            }
        }))
    }

    if (notice === 'Success') {
        return <Redirect to='/projects'/>
    }

    return (
        <div
            className={`${styles.home} + ${colorStyles.home}`}
        >

            <div
                className={`${styles.welcomeContainer} + ${isWelcomeShown ? styles.active : ''} + ${colorStyles.welcomeContainer}`}>

                <span className={`${styles.welcome} + ${isWelcomeShown ? styles.active : ''} + ${colorStyles.welcome}`}
                >{labels.welcomeToFieldDB}</span>

                <span className={`${styles.slogan} + ${isSlogan ? styles.active : ''} + ${colorStyles.slogan}`}
                >{labels.realizeYourIdeas}</span>

                <div className={styles.buttons}>
                <NavLink to='/docs' style={{textDecoration: 'none', margin: `10px`}}>
                    <Button
                        label={labels.getStarted}
                        color={'#9c9cf8'}
                        backgroundColor={'transparent'}
                    />
                </NavLink>

                {!isAuthenticated &&
                <>
                    <Button
                        label={labels.signIn}
                        color={'#78b07b'}
                        backgroundColor={'transparent'}
                        onClickHandler={onSignInClick}
                    />
                    <Button
                        label={labels.signUp}
                        color={theme === 'Light' ? '#212121' : '#d2d2d2'}
                        backgroundColor={'transparent'}
                        onClickHandler={onSignUpClick}
                    />
                </>}
                </div>

            </div>

        </div>
    )
}

export default memo(Home)