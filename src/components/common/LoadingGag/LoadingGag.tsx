import React, {FC} from 'react'
import {useAppSelector} from '../../../redux/hooks/redux'


type LoadingGagPropsType = {
    width: number
    size: 'small' | 'medium' | 'premedium' | 'large' | 'prelarge'
}

export const LoadingGag: FC<LoadingGagPropsType> = ({width, size}) => {

    const {theme} = useAppSelector(state => state.settingsReducer)

    let height: number

    switch (size) {
        case 'small':
            height = 10
            break
        case 'medium':
            height = 20
            break
        case 'premedium':
            height = 30
            break
        case 'large':
            height = 40
            break
        case 'prelarge':
            height = 50
            break
        default:
            height = 20
    }

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: `${Math.floor(height / 2)}px`,
                backgroundColor: theme === 'Light' ? '#eeeeee' : '#414040'
            }}
        >
        </div>
    )
}