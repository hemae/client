import React, {FC, memo} from 'react'
import styles from './Key.module.css'
import {useAppSelector} from '../../../../../../redux/hooks/redux'


type KeyPropsType = {
    _key: string
}

const Key: FC<KeyPropsType> = ({_key}) => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Key${theme}.module.css`)

    return (
        <div className={`${styles.key} + ${colorStyles.key}`}>
            "{_key}":
        </div>
    )
}

export default memo<KeyPropsType>(Key)