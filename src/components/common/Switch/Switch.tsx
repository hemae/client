import React, {FC, memo, useState} from 'react'
import styles from './Switch.module.css'
import {useAppSelector} from '../../../redux/hooks/redux'


type SwitchPropsType = {
    setProp: (prop: any) => void
    prop1: any
    prop2: any,
    currentProp: any
    icons?: {
        icon1: JSX.Element,
        icon2: JSX.Element
    }
    isText?: boolean
    size?: number
    title?: string
}

const Switch: FC<SwitchPropsType> = (props) => {

    const {
        setProp,
        prop1,
        prop2,
        currentProp,
        icons,
        isText,
        size = 24,
        title
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Switch${theme}.module.css`)

    const [isToggleOver, setIsToggleOver] = useState<boolean>(false)

    const onSwitchClick = (): void => {
        setProp(prop1 === currentProp ? prop2 : prop1)
    }

    const onToggleOver = (): void => {
        setIsToggleOver(true)
    }

    const onToggleLeave = (): void => {
        setIsToggleOver(false)
    }

    const switchStyle = {
        height: `${size}px`,
        width: `${2 * size + (size * 1 / 6)}px`,
        borderRadius: `${Math.round(size / 2)}px`,
        flexDirection: prop1 === currentProp ? 'row' : 'row-reverse',
        fontSize: `${Math.round(size * 10 / 13)}px`
    }

    const toggleStyle = {
        height: `${Math.round(size * 12 / 13)}px`,
        width: `${Math.round(size * 12 / 13)}px`,
        borderRadius: `${Math.round(size / 2)}px`,
        margin: `${Math.round(size * 1 / 13)}px`,
        boxShadow: isToggleOver
            ? `0 0 ${theme === 'Light' ? 3 : 6}px ${theme === 'Light' ? '#8a8a8a' : '#232323'}`
            : 'none'
    }

    return (
        <div
            className={`${styles.switch} + ${colorStyles.switch}`}
            //@ts-ignore
            style={switchStyle}
            onClick={onSwitchClick}
            onMouseOver={onToggleOver}
            onMouseLeave={onToggleLeave}
            title={title || ''}
        >

            <div
                className={`${styles.toggle} + ${colorStyles.toggle}`}
                style={toggleStyle}
            >
            </div>

            {icons &&
            <div
                style={{
                    marginTop: `${!isText ? Math.round(size * 2 / 13) : 0}px`,
                    marginLeft: `${Math.round(size * 1 / 13)}px`,
                    marginRight: `${Math.round(size * 1 / 13)}px`
                }}
            >{prop1 === currentProp ? icons.icon1 : icons.icon2}</div>}

        </div>
    )
}

export default memo<SwitchPropsType>(Switch)