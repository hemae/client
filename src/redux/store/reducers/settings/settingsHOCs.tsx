import {FC} from 'react'
import {useAppSelector} from '../../../hooks/redux'
import {HocFCToFCType} from '../../../HOCTypes'
import {LanguageType, ThemeType} from '../../../models/settings'


export const withTheme: HocFCToFCType = (Component: FC<any>) => {
    const theme: ThemeType = useAppSelector(state => state.settingsReducer.theme)
    return (props) => <Component {...props} theme={theme}/>
}

export const withLanguage: HocFCToFCType = (Component: FC<any>) => {
    const language: LanguageType = useAppSelector(state => state.settingsReducer.language)
    return (props) => <Component {...props} language={language}/>
}