import {StateType} from '../../redux/StateType'


export type RoutesPropsType = {
    isAuthenticated: boolean
}

export type RoutesMapStateToPropsType = (state: StateType) => RoutesPropsType

export type RoutesCallbacksType = {

}

export type RoutesAdditionalPropsType = {

}

export type RoutesContextPropsType = RoutesCallbacksType & RoutesPropsType & RoutesAdditionalPropsType