import React, {FC, memo} from 'react'
import styles from './AlertPopUpWrapper.module.css'
import PopUpWrapper from '../PopUpWrapper/PopUpWrapper'
import {popUpSlice} from '../../../../redux/store/reducers/popUp/popUpSlice'
import {useAppDispatch} from '../../../../redux/hooks/redux'


type AlertPopUpWrapperPropsType = {
    message: string
    rightBtnHandler: () => void
    rightBtnLabel?: string
    leftBtnLabel?: string
}

const AlertPopUpWrapper: FC<AlertPopUpWrapperPropsType> = (props) => {

    const {
        rightBtnHandler,
        message,
        leftBtnLabel,
        rightBtnLabel
    } = props

    const dispatch = useAppDispatch()

    const leftBtnHandler = (): void => {
        dispatch(popUpSlice.actions.closePopUp())
    }

    return (
        <PopUpWrapper child={<div className={styles.textNotification}>{message}</div>}
                      leftBtnHandler={leftBtnHandler}
                      rightBtnHandler={rightBtnHandler}
                      leftBtnLabel={leftBtnLabel}
                      rightBtnLabel={rightBtnLabel}
        />
    )
}

export default memo<AlertPopUpWrapperPropsType>(AlertPopUpWrapper)
