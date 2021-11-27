import React, {FC, memo} from 'react'
import styles from './ItemWrapper.module.css'
import {useAppSelector} from '../../../redux/hooks/redux'


type ItemWrapperPropsType = {
    child: JSX.Element
    onClickHandler?: () => void
    title?: string
    width?: string
    height?: string
    padding?: string
    borderRadius?: string
    margin?: string
    opacity?: string
    cursor?: 'pointer' | 'default' | 'progress'
}

const ItemWrapper: FC<ItemWrapperPropsType> = (props) => {

    const {
        child,
        title = '',
        width = 'auto',
        height = 'auto',
        padding = '0px',
        borderRadius = '10px',
        margin = '10px',
        cursor = 'pointer',
        opacity = '1',
        onClickHandler = () => undefined
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./ItemWrapper${theme}.module.css`)

    const itemWrapperStyles = {
        width, height, padding, borderRadius, margin, cursor, opacity
    }

    const onItemWrapperClick = (): void => {
        onClickHandler()
    }

    return (
        <div
            className={`${styles.itemWrapper} + ${colorStyles.itemWrapper}`}
            title={title}
            onClick={onItemWrapperClick}
            style={itemWrapperStyles}
        >
            {child}
        </div>
    )
}

export default memo<ItemWrapperPropsType>(ItemWrapper)