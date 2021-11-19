import React, {FC, useEffect, useState} from 'react'
import {withHomeContextProps} from './homeHOC'
import {
    HomeContextPropsType,
    HomeExternalPropsType
} from './HomeTypes'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import {homeLabels, HomeLabelsType} from './homeLabels'
import styles from './Home.module.css'


const Home: FC<HomeContextPropsType & HomeExternalPropsType> = ({
                                                                                                language,
                                                                                                theme
                                                                                            }) => {

    const colorStyles = require(`./Home${theme}.module.css`)
    const labels: HomeLabelsType = homeLabels[language]

    const {width} = useWindowDimensions()

    const [isWelcomeShown, setIsWelcomeShown] = useState<boolean>(false)
    const [isSlogan, setIsSlogan] = useState<boolean>(false)

    useEffect(() => {
        setIsWelcomeShown(true)
        setTimeout(() => {
            setIsSlogan(true)
        }, 1000)


    }, [])

    return (
        <div className={`${styles.home} + ${colorStyles.home}`}>
            <div className={`${styles.welcomeContainer} + ${isWelcomeShown ? styles.active : ''} + ${colorStyles.welcomeContainer}`}>
                <span className={`${styles.welcome} + ${isWelcomeShown ? styles.active : ''} + ${colorStyles.welcome}`}
                >{labels.welcomeToFieldDB}</span>
                <span className={`${styles.slogan} + ${isSlogan ? styles.active : ''} + ${colorStyles.slogan}`}
                >{labels.realizeYourIdeas}</span>
            </div>
        </div>
    )
}

export default withHomeContextProps(Home) as FC<HomeExternalPropsType>