import React, {FC, useEffect, useState} from 'react'
import styles from './Switch.module.css'
import {SwitchContextPropsType, SwitchExternalPropsType} from './SwitchTypes'
import {withSwitchContextProps} from './switchHOC'


const Switch: FC<SwitchContextPropsType & SwitchExternalPropsType> = ({
                                                                          setProp,
                                                                          prop1,
                                                                          prop2,
                                                                          currentProp,
                                                                          icons,
                                                                          isText,
                                                                          theme,
                                                                          size = 24
                                                                      }) => {

    const colorStyles = require(`./Switch${theme}.module.css`)

    const [state, setState] = useState<boolean>(prop1 === currentProp)

    const onSwitchClick = (): void => {
        setProp(state ? prop2 : prop1)
    }

    useEffect(() => {
        setState(prop1 === currentProp)
    }, [currentProp])

    const switchStyle = {
        height: `${size}px`,
        width: `${2 * size + (size * 1 / 6)}px`,
        borderRadius: `${Math.round(size / 2)}px`,
        flexDirection: state ? 'row' : 'row-reverse',
        fontSize: `${Math.round(size * 10 / 13)}px`
    }

    const toggleStyle = {
        height: `${Math.round(size * 12 / 13)}px`,
        width: `${Math.round(size * 12 / 13)}px`,
        borderRadius: `${Math.round(size / 2)}px`,
        margin: `${Math.round(size * 1 / 13)}px`
    }

    return (
        <div className={`${styles.switch} + ${colorStyles.switch}`}
            //@ts-ignore
             style={switchStyle}
             onClick={onSwitchClick}
        >
            <div className={`${styles.toggle} + ${colorStyles.toggle}`}
                 style={toggleStyle}
            ></div>
            {icons && <div style={{
                marginTop: `${!isText ? Math.round(size * 2 / 13) : 0}px`,
                marginLeft: `${Math.round(size * 1 / 13)}px`,
                marginRight: `${Math.round(size * 1 / 13)}px`
            }}
            >{state ? icons.icon1 : icons.icon2}</div>}
        </div>
    )
}

export default withSwitchContextProps(Switch) as FC<SwitchExternalPropsType>