export type ItemWrapperExternalPropsType = {
    child: JSX.Element
    onClickHandler?: () => void
    title?: string
    width?: string
    height?: string
    padding?: string
    borderRadius?: string
    margin?: string
    opacity?: string
    cursor?: 'pointer' | 'default' | 'progress'
}

export type ItemWrapperAdditionalPropsType = {
    theme: 'Dark' | 'Light'
}

export type ItemWrapperContextPropsType = ItemWrapperAdditionalPropsType