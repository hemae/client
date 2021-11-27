import React, {FC, memo, useEffect, useState} from 'react'
import styles from './PopUpBackground.module.css'
import {useAppSelector} from '../../../redux/hooks/redux'


const PopUpBackground: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./PopUpBackground${theme}.module.css`)

    const [localIsShown, setLocalIsShown] = useState<boolean>(false)

    useEffect(() => {
        setLocalIsShown(true)
    }, [])

    return (
        <div className={`${styles.background} + ${localIsShown ? styles.active : ''} + ${colorStyles.background}`}>
        </div>
    )
}

export default memo(PopUpBackground)