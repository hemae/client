import React, {FC, memo, useState} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
    darcula, atelierForestLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {useAppSelector} from '../../../redux/hooks/redux'
import styles from './CodeBlock.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import * as BiIcons from 'react-icons/bi'


type CodeBlockPropsType = {
    code: string
    language?: string
    numerable?: boolean
}

const CodeBlock: FC<CodeBlockPropsType> = (props) => {

    const {
        code,
        language = 'javascript',
        numerable = true
    } = props

    const {theme} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./CodeBlock${theme}.module.css`)

    const [isCopyShown, setIsCopyShown] = useState<boolean>(false)

    const onCopyOver = (): void => {
        setIsCopyShown(true)
    }

    const onCopyLeave = (): void => {
        setIsCopyShown(false)
    }

    return (
        <div
            className={styles.codeContainer}
            onMouseOver={onCopyOver}
            onMouseLeave={onCopyLeave}
        >
            <SyntaxHighlighter
                language={language}
                style={theme === 'Light' ? atelierForestLight : darcula}
                showLineNumbers={numerable}
                lineNumberStyle={{color: theme === 'Light' ? '#bdbdbd' : '#444444'}}
                customStyle={{margin: '10px 0', padding: '15px 5px'}}
            >
                {code}
            </SyntaxHighlighter>
            <CopyToClipboard text={code}>
                <div
                    className={`${styles.copyBtn} + ${isCopyShown ? styles.shown : ''} + ${colorStyles.copyBtn}`}
                ><BiIcons.BiCopyAlt/></div>
            </CopyToClipboard>
        </div>
    )
}

export default memo<CodeBlockPropsType>(CodeBlock)