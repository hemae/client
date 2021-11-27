import React, {FC, memo} from 'react'
import styles from './Button.module.css'
import {useAppSelector} from '../../../redux/hooks/redux'


type ButtonPropsType = {
    label: string
    icon?: JSX.Element
    disabled?: boolean
    color?: string
    backgroundColor?: string
    onClickHandler?: () => void
}

const Button: FC<ButtonPropsType> = ({
                                         label,
                                         onClickHandler,
                                         icon,
                                         disabled,
                                         color,
                                         backgroundColor
                                     }) => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Button${theme}.module.css`)

    return (
        <div
            className={`${styles.button} + ${colorStyles.button} + ${disabled ? styles.disabled : ''} + ${disabled ? colorStyles.disabled : ''}`}
            onClick={onClickHandler}
            style={{
                color,
                backgroundColor,
                boxShadow: `0 0 8px ${color}`
            }}
        >
            <div className={styles.btnLabel}>{label}</div>
            {!!icon && <div className={styles.icon}>{icon}</div>}
        </div>
    )
}


export default memo<ButtonPropsType>(Button)