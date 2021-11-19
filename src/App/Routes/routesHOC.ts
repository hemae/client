import {FC, memo} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {HocFCToFCType} from '../../redux/HOCTypes'
import {RoutesCallbacksType, RoutesContextPropsType, RoutesMapStateToPropsType} from './RoutesTypes'
import {getIsAuthenticatedFrom} from '../../redux/auth/authSelectors'


export const withRoutesContextProps: HocFCToFCType = (Component: FC<RoutesContextPropsType>) => {

    const MapStateToProps: RoutesMapStateToPropsType = (state) => {
        return {
            isAuthenticated: getIsAuthenticatedFrom(state)
        }
    }

    const callbacks: RoutesCallbacksType = {

    }

    return compose<FC<{}>>(
        connect(MapStateToProps, callbacks),
        memo
    )(Component)
}