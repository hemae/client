import React, {FC} from 'react'
import styles from './ItemWrapper.module.css'
import {ItemWrapperContextPropsType, ItemWrapperExternalPropsType} from './ItemWrapperTypes'
import {compose} from 'redux'
import {withThemeFC} from '../../../redux/settings/settingsHOCs'


const ItemWrapperComponent: FC<ItemWrapperContextPropsType & ItemWrapperExternalPropsType> = ({
                                                                                                  theme,
                                                                                                  child,
                                                                                                  title = '',
                                                                                                  width = 'auto',
                                                                                                  height = 'auto',
                                                                                                  padding = '10px',
                                                                                                  borderRadius = '10px',
                                                                                                  margin = '10px',
                                                                                                  cursor = 'pointer',
                                                                                                  opacity = '1',
                                                                                                  onClickHandler = () => undefined
                                                                                              }) => {

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

export default compose<FC<ItemWrapperExternalPropsType>>(
    withThemeFC
)(ItemWrapperComponent)