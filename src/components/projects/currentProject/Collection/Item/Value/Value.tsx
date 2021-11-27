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
    keyNumber: number | undefined
    localIsOpened: boolean
    setLocalIsOpened: (localIsOpened: boolean) => void
    keyString: string | undefined
    setIsIAmHover?: (isIAmHover: boolean) => void
}

const ObjectValue: FC<ObjectPropsType> = (props) => {

    const {
        kind,
        value,
        localIsOpened,
        setLocalIsOpened,
        keyNumber,
        keyString,
        setIsIAmHover
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Value${theme}.module.css`)

    const [isBracketsHover, setIsBracketsHover] = useState<boolean>(false)
    const [isObjectHover, setIsObjectHover] = useState<boolean>(false)
    const [isChildHover, setIsChildHover] = useState<boolean>(false)

    const onObjectOver = (): void => {
        // if (!isChildHover) {
            setIsObjectHover(true)
            if (setIsIAmHover) {
                setIsIAmHover(true)
            }
        // }
    }

    const onObjectLeave = (): void => {
        setIsObjectHover(false)
        if (setIsIAmHover) {
            setIsIAmHover(false)
        }
    }

    const onBracketsOver = (): void => {
        setIsBracketsHover(true)
    }

    const onBracketsLeave = (): void => {
        setIsBracketsHover(false)
    }

    const onObjectClick = (): void => {
        setLocalIsOpened(!localIsOpened)
        setIsBracketsHover(false)
    }

    const headerLabel: string = kind === 'Array'
        ? `Array (${value.length}) [${!localIsOpened ? '...]' : ''}`
        : `{${!localIsOpened ? '...}' : ''}`


    const averageCharacterWidth = 7
    const marginLeft = keyString && keyString !== '#' ? -((keyString.length + (kind === 'Array' ? 4 : 0)) * averageCharacterWidth) : 15
    const downBracketMarginLeft = keyString ? -(keyString.length * averageCharacterWidth + 5) : 0

    const renderingJSX: JSX.Element = kind === 'Array'
        ? <>{//@ts-ignore
            value.map((_value, index) => {
                return (
                    <div
                        key={index}
                        className={`${styles.record} + ${!keyString && isObjectHover && !isChildHover ? colorStyles.hover : ''}`}
                        style={{marginLeft: `${marginLeft}px`}}
                        onMouseOver={onObjectOver}
                        onMouseLeave={onObjectLeave}
                    ><Value value={_value} keyNumber={index} setIsIAmHover={setIsChildHover} keyString={'#'}/></div>
                )
            })}</>
        : <>{Object.keys(value).map((_key, index) => {
            return (
                <div
                    key={index}
                    className={`${styles.record} + ${colorStyles.record} + ${keyString && isObjectHover && !isChildHover ? colorStyles.hover : ''}`}
                    style={{
                        marginLeft: `${marginLeft}px`
                    }}
                    onMouseOver={onObjectOver}
                    onMouseLeave={onObjectLeave}
                >
                    <Key _key={_key}/>
                    <Value value={value[_key]} keyString={_key} setIsIAmHover={setIsChildHover}/>
                </div>
            )
        })}</>

    return (
        <div
            className={`${styles.object} + ${colorStyles.object}`}
        >
            <div
                className={`${styles.objectHeader} + ${colorStyles.objectHeader} + ${isBracketsHover ? colorStyles.hover : ''} + ${keyString && isObjectHover && !isChildHover ? colorStyles.objectHover : ''}`}
                onMouseOver={onBracketsOver}
                onMouseLeave={onBracketsLeave}
                onClick={onObjectClick}
            >
                <KeyNumber keyNumber={keyNumber}/>
                <div>{headerLabel}</div>
            </div>
            {localIsOpened && <>{renderingJSX}</>}
            {localIsOpened &&
            <div
                className={`${styles.objectHeader} + ${colorStyles.objectHeader} + ${isBracketsHover ? colorStyles.hover : ''} + ${keyString && isObjectHover && !isChildHover ? colorStyles.objectHover : ''}`}
                onClick={onObjectClick}
                onMouseOver={onBracketsOver}
                onMouseLeave={onBracketsLeave}
                style={{marginLeft: `${downBracketMarginLeft}px`}}
            >{`${kind === 'Array' ? ']' : '}'}`}</div>}
        </div>
    )

}


const KeyNumber: FC<{ keyNumber?: number }> = ({keyNumber}) => {
    const {theme} = useAppSelector(state => state.settingsReducer)
    const colorStyles = require(`./Value${theme}.module.css`)
    return typeof keyNumber === 'number' ?
        <div className={`${styles.keyNumber} + ${colorStyles.keyNumber}`}>{`${keyNumber}: `}</div> : <></>
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
            <KeyNumber keyNumber={_key}/>
            {isQuotes && '"'}{localIsOpened ? value : renderingValue}{isQuotes && '"'}</div>
    )
}


type ValuePropsType = {
    value: any
    keyNumber?: number
    isOpened?: boolean
    keyString?: string
    childNumber?: number
    setIsIAmHover?: (isIAmHover: boolean) => void
}

const Value: FC<ValuePropsType> = (props) => {

    const {
        value,
        isOpened = false,
        keyNumber,
        keyString,
        setIsIAmHover
    } = props

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
                    keyNumber={keyNumber}
                    localIsOpened={localIsOpened}
                    setLocalIsOpened={setLocalIsOpened}
                    keyString={keyString}
                    setIsIAmHover={setIsIAmHover}
                />
            } catch {
                valueJSX = (
                    <div
                        className={`${styles.value} + ${colorStyles.null}`}
                        title='null'
                    ><KeyNumber keyNumber={keyNumber}/>null</div>
                )
            }
            break
        default:
            valueJSX = <Primitive
                value={value}
                valueType={valueType}
                minValueLength={minValueLength}
                _key={keyNumber}
                localIsOpened={localIsOpened}
                setLocalIsOpened={setLocalIsOpened}
            />
    }

    return valueJSX
}

export default memo<ValuePropsType>(Value)