import {StateType} from '../../../redux/StateType'


export type SwitchExternalPropsType = {
    setProp: any
    prop1: any
    prop2: any,
    currentProp: any
    icons?: {
        icon1: JSX.Element,
        icon2: JSX.Element
    }
    isText?: boolean
    size?: number
}

export type SwitchPropsType = {

}

export type SwitchMapStateToPropsType = (state: StateType) => SwitchPropsType

export type SwitchCallbacksType = {

}

export type SwitchAdditionalPropsType = {
    theme: 'Dark' | 'Light'
}

export type SwitchContextPropsType = SwitchCallbacksType & SwitchPropsType & SwitchAdditionalPropsType