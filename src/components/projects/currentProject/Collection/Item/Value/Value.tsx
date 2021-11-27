import React, {FC, memo, useEffect, useState} from 'react'
import styles from './Value.module.css'
import {valueLabels, ValueLabelsType} from './valueLabels'
import {useAppSelector} from '../../../../../../redux/hooks/redux'
import {GeneralType} from '../../../../../../redux/models/common'
import Key from '../Key/Key'
import useWindowDimensions from '../../../../../../hooks/useWindowDimensions'


type ObjectPropsType = {
    kind: 'Array' | 'Object'
    value: any
    _key: number | undefined
    localIsOpened: boolean
    setLocalIsOpened: (localIsOpened: boolean) => void
}

const ObjectValue: FC<ObjectPropsType> = (props) => {

    const {
        kind,
        value,
        localIsOpened,
        setLocalIsOpened,
        _key
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Value${theme}.module.css`)

    const onObjectClick = (): void => {
        setLocalIsOpened(!localIsOpened)
    }

    const headerLabel: string = kind === 'Array'
        ? `Array (${value.length}) [${!localIsOpened ? '...]' : ''}`
        : `{${!localIsOpened ? '...}' : ''}`

    const renderingJSX: JSX.Element = kind === 'Array'
        ? <>{//@ts-ignore
            value.map((_value, index) => <Value key={index} value={_value} _key={index}/>)}</>
        : <>{Object.keys(value).map((_key, index) => {
            return (
                <div key={index} className={styles.record}>
                    <Key _key={_key}/>
                    <Value value={value[_key]}/>
                </div>
            )
        })}</>

    return (
        <div className={`${styles.object} + ${colorStyles.object}`}>
            <div className={`${styles.objectHeader} + ${colorStyles.objectHeader}`}>
                <KeyNumber _key={_key}/>
                <div onClick={onObjectClick}>{headerLabel}</div>
            </div>
            {localIsOpened && <>{renderingJSX}</>}
            {localIsOpened && <div className={`${styles.objectHeader} + ${colorStyles.objectHeader}`}
                                   onClick={onObjectClick}>{`${kind === 'Array' ? ']' : '}'}`}</div>}
        </div>
    )

}


const KeyNumber: FC<{ _key?: number }> = ({_key}) => {
    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Value${theme}.module.css`)
    return typeof _key === 'number' ?
        <div className={`${styles.keyNumber} + ${colorStyles.keyNumber}`}>{`${_key}: `}</div> : <></>
}


type PrimitivePropsType = {
    value: any
    valueType: GeneralType
    minValueLength: number
    _key: number | undefined
    localIsOpened: boolean
    setLocalIsOpened: (localIsOpened: boolean) => void
}

const Primitive: FC<PrimitivePropsType> = (props) => {

    const {
        value,
        valueType,
        minValueLength,
        localIsOpened,
        setLocalIsOpened,
        _key
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Value${theme}.module.css`)

    const renderingValue = value === undefined
        ? 'undefined'
        : valueType === 'boolean'
            ? value
                ? 'true' : 'false'
            : value.toString().length > minValueLength
                ? value.toString().slice(0, minValueLength) + ' ...' : value

    const onObjectClick = (): void => {
        if (value !== undefined && valueType !== 'boolean' && renderingValue !== value) {
            setLocalIsOpened(!localIsOpened)
        }
    }

    const isQuotes: boolean = valueType === 'string' || valueType === 'symbol'

    return (
        <div
            className={`${styles.value} + ${colorStyles[valueType]}`}
            onClick={onObjectClick}
            style={{
                cursor: value === undefined || valueType === 'boolean' || renderingValue === value ? 'default' : 'pointer'
            }}
            title={valueType}
        >
            <KeyNumber _key={_key}/>
            {isQuotes && '"'}{localIsOpened ? value : renderingValue}{isQuotes && '"'}</div>
    )
}


type ValuePropsType = {
    value: any
    _key?: number
    isOpened?: boolean
}

const Value: FC<ValuePropsType> = ({value, isOpened = false, _key}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {width} = useWindowDimensions()

    const [localIsOpened, setLocalIsOpened] = useState<boolean>(isOpened)

    const borderlineWidth = 830

    const [minValueLength, setMinValueLength] = useState<number>(width > borderlineWidth ? 45 : 15)

    useEffect(() => {
        if (width < borderlineWidth && minValueLength !== 15) {
            setMinValueLength(15)
        }
        if (width > borderlineWidth && minValueLength === 15) {
            setMinValueLength(45)
        }
    }, [width])

    const colorStyles = require(`./Value${theme}.module.css`)
    const labels: ValueLabelsType = valueLabels[language]

    const valueType: GeneralType = typeof value
    let valueJSX: JSX.Element

    switch (valueType) {
        case 'object':
            let kind: 'Array' | 'Object' = 'Object'
            try {
                let _ = value.length
                if (value.length !== undefined) kind = 'Array'
                valueJSX = <ObjectValue
                    kind={kind}
                    value={value}
                    _key={_key}
                    localIsOpened={localIsOpened}
                    setLocalIsOpened={setLocalIsOpened}
                />
            } catch {
                valueJSX = (
                    <div
                        className={`${styles.value} + ${colorStyles.null}`}
                        title='null'
                    ><KeyNumber _key={_key}/>null</div>
                )
            }
            break
        default:
            valueJSX = <Primitive
                value={value}
                valueType={valueType}
                minValueLength={minValueLength}
                _key={_key}
                localIsOpened={localIsOpened}
                setLocalIsOpened={setLocalIsOpened}
            />
    }

    return valueJSX
}

export default memo<ValuePropsType>(Value)