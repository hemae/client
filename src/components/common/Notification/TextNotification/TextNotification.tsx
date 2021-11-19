import React, {FC, memo} from 'react'
import styles from './TextNotification.module.css'
import NotificationWrapper from '../NotificationWrapper/NotificationWrapper'
import {compose} from 'redux'
import {withToken} from '../../../../redux/auth/authHOCs'


type TextNotificationPropsType = {
    rightBtnFunction: any
    leftBtnHandler: () => void
    isShown: boolean
    projectId: string
    message: string
    leftBtnLabel?: string
    rightBtnLabel?: string
}

type TextNotificationAdditionalPropsType = {
    token: string
}

const TextNotification: FC<TextNotificationPropsType & TextNotificationAdditionalPropsType> = ({
                                                                    rightBtnFunction,
                                                                    leftBtnHandler,
                                                                    isShown,
                                                                    projectId,
                                                                    message,
                                                                    leftBtnLabel,
                                                                    rightBtnLabel,
                                                                    token
                                                                }) => {

    const rightBtnHandler = (): void => {
        rightBtnFunction({projectId, token})
        leftBtnHandler()
    }

    return (
        <NotificationWrapper child={<div className={styles.textNotification}>{message}</div>}
                             leftBtnHandler={leftBtnHandler}
                             rightBtnHandler={rightBtnHandler}
                             isShown={isShown}
                             leftBtnLabel={leftBtnLabel}
                             rightBtnLabel={rightBtnLabel}
        />
    )
}

export default compose<FC<TextNotificationPropsType>>(
    withToken,
    memo
)(TextNotification)
