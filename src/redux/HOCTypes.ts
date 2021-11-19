import {FC, ComponentClass} from 'react'


export type HocFCToFCType = (Component: FC<any>) => FC<any>

export type HocFCToComponentClassType = (Component: FC<any>) => ComponentClass<any>

export type HocComponentClassToComponentClassType = (Component: ComponentClass<any>) => ComponentClass<any>

export type HocComponentClassToFCType = (Component: ComponentClass<any>) => FC<any>