import React, {FC, memo, useState} from 'react'
import styles from './InputNotification.module.css'
import NotificationWrapper from '../NotificationWrapper/NotificationWrapper'
import {compose} from 'redux'
import {withLanguageFC, withThemeFC} from '../../../../redux/settings/settingsHOCs'
import {inputNotificationLabels, InputNotificationLabelsType} from './inputNotificationLabels'
import {withToken} from '../../../../redux/auth/authHOCs'


type InputNotificationPropsType = {
    rightBtnFunction: any
    leftBtnHandler: () => void
    rightBtnLabel?: string
    leftBtnLabel?: string
    isShown: boolean
    projectId?: string
    projectName?: string
}

type InputNotificationAdditionalPropsType = {
    theme: 'Dark' | 'Light'
    language: 'en' | 'ru'
    token: string
}

const InputNotification: FC<InputNotificationPropsType & InputNotificationAdditionalPropsType> = ({
                                                                                                      rightBtnFunction,
                                                                                                      leftBtnHandler,
                                                                                                      isShown,
                                                                                                      projectId,
                                                                                                      projectName,
                                                                                                      rightBtnLabel,
                                                                                                      leftBtnLabel,
                                                                                                      theme,
                                                                                                      language,
                                                                                                      token
                                                                                                  }) => {

    const colorStyles = require(`./InputNotification${theme}.module.css`)
    const labels: InputNotificationLabelsType = inputNotificationLabels[language]

    const [value, setValue] = useState<string>(projectName || '')

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }

    const rightBtnHandler = (): void => {
        if (value.trim()) {
            if (value.trim() !== projectName) {
                rightBtnFunction({projectId, projectName: value.trim(), token})
            }
            leftBtnHandler()
        }
    }

    const onEnterPress = (event: any): void => {
        if (event.key === 'Enter') {
            rightBtnHandler()
        }
    }

    const onRightBtnClick = (): void => {
        rightBtnHandler()
    }

    return (
        <NotificationWrapper
            child={<div className={`${styles.inputNotification} + ${colorStyles.inputNotification}`}><input
                value={value}
                onChange={onInputChange}
                placeholder={`${labels.projectName}...`}
                autoFocus={true}
                onKeyPress={onEnterPress}
            /></div>}
            leftBtnHandler={leftBtnHandler}
            rightBtnHandler={onRightBtnClick}
            disabled={!value.trim()}
            isShown={isShown}
            leftBtnLabel={leftBtnLabel}
            rightBtnLabel={rightBtnLabel}
        />
    )
}

export default compose<FC<InputNotificationPropsType>>(
    withThemeFC,
    withLanguageFC,
    withToken,
    memo
)(InputNotification)