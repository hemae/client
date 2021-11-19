import {connect} from 'react-redux'
import {StateType} from '../StateType'
import {getTokenFrom, getUserIdFrom} from './authSelectors'
import {FC} from 'react'
import {HocFCToFCType} from '../HOCTypes'


export const withToken: HocFCToFCType = (Component: FC<any>) => {
    return connect(
        (state: StateType) => ({token: getTokenFrom(state)}),
        {})(Component)
}

//--------------------WITH-USERID--------------------

export const withUserId: HocFCToFCType = (Component: FC<any>) => {
    return connect(
        (state: StateType) => ({userId: getUserIdFrom(state)}),
        {})(Component)
}
