export type DispatchType = (actionCreator: any) => any

export type ThunkCreatorType = (prop?: any) => (dispatch: DispatchType) => void