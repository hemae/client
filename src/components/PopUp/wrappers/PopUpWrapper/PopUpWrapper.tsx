import React, {FC, memo} from 'react'
import styles from './PopUpWrapper.module.css'
import {popUpWrapperLabels, PopUpWrapperLabelsType} from './popUpWrapperLabels'
import {useAppSelector} from '../../../../redux/hooks/redux'


type NotificationWrapperPropsType = {
    child: JSX.Element
    btnDisabled?: boolean
    leftBtnDisabled?: boolean
    rightBtnDisabled?: boolean
    btnHandler?: () => void
    leftBtnHandler?: () => void
    rightBtnHandler?: () => void
    btnLabel?: string
    leftBtnLabel?: string
    rightBtnLabel?: string
}

const PopUpWrapper: FC<NotificationWrapperPropsType> = (props) => {

    const {
        child,
        btnDisabled,
        leftBtnDisabled,
        rightBtnDisabled,
        btnHandler,
        leftBtnHandler,
        rightBtnHandler,
        btnLabel,
        leftBtnLabel,
        rightBtnLabel
    } = props

    const {theme, language} = useAppSelector(state => state.settingsReducer)


    const colorStyles = require(`./PopUpWrapper${theme}.module.css`)
    const labels: PopUpWrapperLabelsType = popUpWrapperLabels[language]

    return (
        <div className={`${styles.popUpWrapper} + ${colorStyles.popUpWrapper}`}>

            <div className={styles.container}>
                {child}
            </div>

            <div className={styles.btns}>
                {btnHandler
                    ? <div
                        className={`${styles.btn} + ${colorStyles.btn} + ${styles.once} + ${btnDisabled ? styles.disabled : ''} + ${btnDisabled ? colorStyles.disabled : ''}`}
                        onClick={btnHandler}
                    >{btnLabel || labels.ok}</div>
                    : <>
                        <div
                            className={`${styles.btn} + ${colorStyles.btn} + ${styles.left} + ${rightBtnDisabled ? styles.disabled : ''} + ${rightBtnDisabled ? colorStyles.disabled : ''}`}
                            onClick={leftBtnHandler}
                        >{leftBtnLabel || labels.cancel}</div>

                        <div
                            className={`${styles.btn} + ${colorStyles.btn} + ${styles.right} + ${leftBtnDisabled ? styles.disabled : ''} + ${leftBtnDisabled ? colorStyles.disabled : ''}`}
                            onClick={leftBtnDisabled ? () => null : rightBtnHandler}
                        >{rightBtnLabel || labels.ok}</div>
                    </>}
            </div>

        </div>
    )
}

export default memo<NotificationWrapperPropsType>(PopUpWrapper)