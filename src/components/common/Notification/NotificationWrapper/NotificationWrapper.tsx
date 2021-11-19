import React, {FC, useEffect, useState} from 'react'
import styles from './NotificationWrapper.module.css'
import {NotificationWrapperContextPropsType, NotificationWrapperExternalPropsType} from './NotificationWrapperTypes'
import {withNotificationWrapperContextProps} from './notificationWrapperHOC'
import {notificationWrapperLabels, NotificationWrapperLabelsType} from './notificationWrapperLabels'


const NotificationWrapperComponent: FC<NotificationWrapperContextPropsType & NotificationWrapperExternalPropsType> = ({
                                                                                                                          child,
                                                                                                                          disabled,
                                                                                                                          leftBtnHandler,
                                                                                                                          rightBtnHandler,
                                                                                                                          isShown,
                                                                                                                          setIsNotification,
                                                                                                                          leftBtnLabel,
                                                                                                                          rightBtnLabel,
                                                                                                                          theme,
                                                                                                                          language
                                                                                                                      }) => {

    const colorStyles = require(`./NotificationWrapper${theme}.module.css`)
    const labels: NotificationWrapperLabelsType = notificationWrapperLabels[language]

    const [isBackground, setIsBackground] = useState<boolean>(false)
    const [localIsShown, setLocalIsShown] = useState<boolean>(false)

    useEffect(() => {
        if (isShown) {
            setIsNotification(true)
            setTimeout(() => {
                setIsBackground(true)
            }, 450)
            setTimeout(() => {
                setLocalIsShown(true)
            }, 150)
        }

        return () => {
            setIsNotification(false)
            setIsBackground(false)
        }
    }, [isShown])

    return (
        <div className={`${styles.notificationContainer} + ${localIsShown ? styles.active : ''}`}
             style={{backgroundColor: `${isBackground ? theme === 'Light' ? '#dcdcdc' : '#dcdcdc' : 'none'}`}}
        >
            <div className={`${styles.notification} + ${colorStyles.notification}`}>

                <div className={styles.container}>
                    {child}
                </div>

                <div className={styles.btns}>
                    <div className={`${styles.btn} + ${colorStyles.btn} + ${styles.left}`}
                         onClick={leftBtnHandler}
                    >{leftBtnLabel || labels.cancel}
                    </div>

                    <div className={`${styles.btn} + ${colorStyles.btn} + ${styles.right} + ${disabled ? styles.disabled : ''} + ${disabled ? colorStyles.disabled : ''} `}
                         onClick={disabled ? () => null : rightBtnHandler}
                    >{rightBtnLabel || labels.ok}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withNotificationWrapperContextProps(NotificationWrapperComponent) as FC<NotificationWrapperExternalPropsType>