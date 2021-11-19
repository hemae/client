export type ButtonExternalPropsType = {
    label: string
    icon?: JSX.Element
    disabled?: boolean
    color: string
    onClickHandler: () => void
}

export type ButtonAdditionalPropsType = {
    theme: 'Dark' | 'Light'
}

export type ButtonContextPropsType = ButtonAdditionalPropsType