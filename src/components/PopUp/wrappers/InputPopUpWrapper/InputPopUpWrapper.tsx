import React, {FC, memo} from 'react'
import styles from './InputPopUpWrapper.module.css'
import PopUpWrapper from '../PopUpWrapper/PopUpWrapper'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks/redux'
import {popUpSlice} from '../../../../redux/store/reducers/popUp/popUpSlice'


type InputPopUpWrapperPropsType = {
    rightBtnHandler: () => void
    rightBtnLabel?: string
    leftBtnLabel?: string
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const InputPopUpWrapper: FC<InputPopUpWrapperPropsType> = (props) => {

    const {
        rightBtnHandler,
        rightBtnLabel,
        leftBtnLabel,
        placeholder,
        value,
        setValue
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./InputPopUpWrapper${theme}.module.css`)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value)
    }

    const leftBtnHandler = (): void => {
        dispatch(popUpSlice.actions.closePopUp())
    }

    const onEnterPress = (event: any): void => {
        if (event.key === 'Enter') {
            rightBtnHandler()
        }
    }

    return (
        <PopUpWrapper
            child={<div className={`${styles.inputPopUpWrapper} + ${colorStyles.inputPopUpWrapper}`}>
                <input
                    value={value}
                    onChange={onInputChange}
                    placeholder={placeholder}
                    autoFocus={true}
                    onKeyPress={onEnterPress}
                /></div>}
            leftBtnHandler={leftBtnHandler}
            rightBtnHandler={rightBtnHandler}
            leftBtnDisabled={!value.trim()}
            leftBtnLabel={leftBtnLabel}
            rightBtnLabel={rightBtnLabel}
        />
    )
}

export default memo<InputPopUpWrapperPropsType>(InputPopUpWrapper)