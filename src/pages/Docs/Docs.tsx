import React, {FC, memo, useEffect, useState} from 'react'
import {docsLabels, DocsLabelsType} from './docsLabels'
import styles from './Docs.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import CodeBlock from '../../components/docs/CodeBlock/CodeBlock'
import Navbar from '../../components/docs/Navbar/Navbar'
import {codeBlocks} from './code'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import * as FiIcons from 'react-icons/fi'
import gitHubLogo from '../../assets/github-logo.png'
import npmLogo from '../../assets/npm-logo.png'


const Docs: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Docs${theme}.module.css`)
    const labels: DocsLabelsType = docsLabels[language]
    const dispatch = useAppDispatch()
    const {width} = useWindowDimensions()

    const borderlineWidth = 1000

    const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(width < borderlineWidth)
    const [isNavbarShown, setIsNavbarShown] = useState<boolean>(false)

    useEffect(() => {
        if (width < borderlineWidth && !isNavbarHidden) {
            setIsNavbarHidden(true)
        }
        if (width > borderlineWidth && isNavbarHidden) {
            setIsNavbarHidden(false)
            setIsNavbarShown(false)
        }
    }, [width])

    const onShowOver = (): void => {
        setIsNavbarShown(true)
    }

    const onNavbarLeave = (): void => {
        setIsNavbarShown(false)
    }

    return (
        <div
            className={`${styles.docs} + ${colorStyles.docs}`}
        >

            {!isNavbarHidden &&
            <div
                className={`${styles.navbar} + ${colorStyles.navbar}`}
            ><Navbar/></div>}

            {isNavbarHidden &&
            <div
                className={`${styles.showList} + ${colorStyles.showList}`}
                onMouseOver={onShowOver}
            ><FiIcons.FiAlignLeft/></div>}
            
            <div className={styles.content}>

                <div className={styles.logos}>
                    <a href='https://github.com/hemae/field-database'><img src={gitHubLogo} alt=''/></a>
                    <a href='https://www.npmjs.com/package/field-database'><img src={npmLogo} alt=''/></a>
                </div>

                <div className={`${styles.oneBlock} + ${colorStyles.oneBlock}`}>
                    <h1>{labels.headers.appUsage}</h1>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2 id={docsLabels.en.headers.registration}>{labels.headers.registration}</h2>
                        <span>{labels.labels.register}</span>
                    </div>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2 id={docsLabels.en.headers.importantData}>{labels.headers.importantData}</h2>
                        <span>{labels.labels.importantData}</span>
                        <span>{labels.labels.projectCreation}</span>
                        <span>{labels.labels.projectData}</span>
                        <span>{labels.labels.projectId}</span>
                    </div>

                </div>

                <div className={`${styles.oneBlock} + ${colorStyles.oneBlock}`}>
                    <h1>{labels.headers.npmPackage}</h1>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2 id={docsLabels.en.headers.features}>{labels.headers.features}</h2>
                        <span>{labels.labels.features1}</span>
                        <span style={{marginTop: '15px'}}>{labels.labels.features2}</span>
                    </div>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2 id={docsLabels.en.headers.installing}>{labels.headers.installing}</h2>
                        <span>{labels.labels.addThePackageToYourProject}</span>
                        <CodeBlock code={'npm i field-database'} numerable={false}/>
                    </div>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2>{labels.headers.example}</h2>

                        <div className={styles.threeBlock}>
                            <h3 id={docsLabels.en.headers.modelCreation}>{labels.headers.modelCreation}</h3>
                            <span>{labels.labels.modelCreation}</span>
                            <span>{labels.labels.exportLastOne}</span>
                            <CodeBlock code={codeBlocks.modelCreation}/>
                            <span>{labels.labels.usingTypeScript}</span>
                            <CodeBlock code={codeBlocks.modelCreationTS}/>
                            <span>{labels.labels.schemaTypes}</span>
                            <span>{labels.labels.types}</span>
                        </div>

                        <div className={styles.threeBlock}>
                            <h3 id={docsLabels.en.headers.connection}>{labels.headers.connection}</h3>
                            <span>{labels.labels.beforeConnection}</span>
                            <span>{labels.labels.connectionPreHeader}</span>
                            <CodeBlock code={codeBlocks.connection}/>
                        </div>

                        <div className={styles.threeBlock}>
                            <h3 id={docsLabels.en.headers.usage}>{labels.headers.usage}</h3>
                            <span>{labels.labels.exampleAbove}</span>
                            <span>{labels.labels.instanceCreation}</span>
                            <span>{labels.labels.aboutSave}</span>
                            <CodeBlock code={codeBlocks.usage}/>
                            <span>{labels.labels.whatIsObject}</span>
                            <CodeBlock code={codeBlocks.objectsExample} numerable={false}/>
                        </div>

                        <div className={styles.threeBlock}>
                            <h3>{labels.headers.availableMethods}</h3>
                            <span>{labels.labels.demoVersion}</span>
                            <div className={styles.fourBlock}>
                                <h4 id='save'>save</h4>
                                <span>{labels.labels.save}</span>
                                <CodeBlock code={codeBlocks.save}/>
                            </div>

                            <div className={styles.fourBlock}>
                                <h4 id='find'>find</h4>
                                <span>{labels.labels.find}</span>
                                <CodeBlock code={codeBlocks.find[language]}/>
                            </div>

                            <div className={styles.fourBlock}>
                                <h4 id='findById'>findById</h4>
                                <span>{labels.labels.findById}</span>
                                <CodeBlock code={codeBlocks.findById[language]}/>
                            </div>

                            <div className={styles.fourBlock}>
                                <h4 id='findOne'>findOne</h4>
                                <span>{labels.labels.findOne}</span>
                                <CodeBlock code={codeBlocks.findOne[language]}/>
                            </div>

                            <div className={styles.fourBlock}>
                                <h4 id='findByIdAndUpdate'>findByIdAndUpdate</h4>
                                <span>{labels.labels.findByIdAndUpdate}</span>
                                <CodeBlock code={codeBlocks.findByIdAndUpdate[language]}/>
                            </div>

                            <div className={styles.fourBlock}>
                                <h4 id='findByIdAndDelete'>findByIdAndDelete</h4>
                                <span>{labels.labels.findByIdAndDelete}</span>
                                <CodeBlock code={codeBlocks.findByIdAndDelete}/>
                            </div>

                        </div>
                    </div>

                    <div className={`${styles.twoBlock} + ${colorStyles.twoBlock}`}>
                        <h2 id={docsLabels.en.headers.errors}>{labels.headers.errors}</h2>
                        <span>{labels.labels.errors}</span>
                        <CodeBlock code={'Property "messageText" is required on type Message'} numerable={false}/>
                        <CodeBlock code={'Property "messageLikes" does not exist on type Message'} numerable={false}/>
                        <CodeBlock code={'Property "messageText" should be "string" type but got "number"'}
                                   numerable={false}/>
                    </div>

                </div>
            </div>

            {isNavbarHidden &&
            <div
                className={`${styles.navbarHidden} + ${colorStyles.navbarHidden} + ${isNavbarShown ? styles.shown : ''}`}
                onMouseLeave={onNavbarLeave}
            ><Navbar/></div>}

        </div>
    )
}

export default memo(Docs)
