import React, {FC} from 'react'
import styles from './Button.module.css'
import {ButtonContextPropsType, ButtonExternalPropsType} from './ButtonTypes'
import {compose} from 'redux'
import {withThemeFC} from '../../../redux/settings/settingsHOCs'


const ButtonComponent: FC<ButtonContextPropsType & ButtonExternalPropsType> = ({
                                                                                   label,
                                                                                   onClickHandler,
                                                                                   icon,
                                                                                   disabled,
                                                                                   color,
                                                                                   theme
                                                                               }) => {

    const colorStyles = require(`./Button${theme}.module.css`)

    return (
        <div
            className={`${styles.button} + ${colorStyles.button} + ${disabled ? styles.disabled : ''} + ${disabled ? colorStyles.disabled : ''}`}
            onClick={onClickHandler}
            style={{
                color,
                boxShadow: `0 0 8px ${color}`
            }}
        >
            <div className={styles.btnLabel}>{label}</div>
            {!!icon && <div className={styles.icon}>{icon}</div>}
        </div>
    )
}


export const Button: FC<ButtonExternalPropsType> = compose<FC<ButtonExternalPropsType>>(
    withThemeFC
)(ButtonComponent)