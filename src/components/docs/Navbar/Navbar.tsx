import React, {FC, memo, useState} from 'react'
import {useAppSelector} from '../../../redux/hooks/redux'
import styles from './Navbar.module.css'
import {navbarLabels, NavbarLabelsType} from './navbarLabels'
import * as FiIcons from 'react-icons/fi'
import {docsLabels} from '../../../pages/Docs/docsLabels'


const Navbar: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Navbar${theme}.module.css`)
    const labels: NavbarLabelsType = navbarLabels[language]


    const [isAppUsageContentShown, setIsAppUsageContentShown] = useState<boolean>(true)
    const [isNpmPackageContentShown, setIsNpmPackageContentShown] = useState<boolean>(true)
    const [isExampleContentShown, setIsExampleContentShown] = useState<boolean>(false)
    const [isAvailableMethodsContentShown, setIsAvailableMethodsContentShown] = useState<boolean>(false)

    return (
        <div className={styles.navbar}>

            <h1>{labels.tableOfContents}</h1>

            <div className={`${styles.header}`}>
                <div
                    className={`${styles.container} + ${colorStyles.container} + ${isAppUsageContentShown ? colorStyles.active : ''}`}
                    onClick={() => setIsAppUsageContentShown(prev => !prev)}
                >
                    <div
                        className={`${styles.chevron} + ${colorStyles.chevron}`}
                    >{isAppUsageContentShown ? <FiIcons.FiChevronDown/> : <FiIcons.FiChevronRight/>}</div>
                    {labels.headers.appUsage}</div>
                {isAppUsageContentShown &&
                <div className={`${styles.headerContent} + ${colorStyles.headerContent}`}>
                    <a href={`#${docsLabels.en.headers.registration}`}>{labels.headers.registration}</a>
                    <a href={`#${docsLabels.en.headers.importantData}`}>{labels.headers.importantData}</a>
                </div>}
            </div>


            <div className={`${styles.header} + ${colorStyles.header} + ${isNpmPackageContentShown ? colorStyles.active : ''}`}>

                <div
                    className={`${styles.container} + ${colorStyles.container} + ${isNpmPackageContentShown ? colorStyles.active : ''}`}
                    onClick={() => setIsNpmPackageContentShown(prev => !prev)}
                >
                    <div
                        className={`${styles.chevron} + ${colorStyles.chevron}`}
                    >{isNpmPackageContentShown ? <FiIcons.FiChevronDown/> : <FiIcons.FiChevronRight/>}</div>
                    {labels.headers.npmPackage}</div>

                {isNpmPackageContentShown &&
                <div className={`${styles.headerContent} + ${colorStyles.headerContent}`}>
                    <a href={`#${docsLabels.en.headers.features}`}>{labels.headers.features}</a>
                    <a href={`#${docsLabels.en.headers.installing}`}>{labels.headers.installing}</a>
                    <div
                        className={`${styles.container} + ${colorStyles.container} + ${isExampleContentShown ? colorStyles.active : ''}`}
                        onClick={() => setIsExampleContentShown(prev => !prev)}
                    >
                        <div
                            className={`${styles.chevron} + ${colorStyles.chevron}`}
                        >{isExampleContentShown ? <FiIcons.FiChevronDown/> : <FiIcons.FiChevronRight/>}</div>
                        {labels.headers.example}</div>
                    {isExampleContentShown &&
                    <div className={`${styles.headerContent} + ${colorStyles.headerContent}`}>
                        <a href={`#${docsLabels.en.headers.modelCreation}`}>{labels.headers.modelCreation}</a>
                        <a href={`#${docsLabels.en.headers.connection}`}>{labels.headers.connection}</a>
                        <a href={`#${docsLabels.en.headers.usage}`}>{labels.headers.usage}</a>
                        <div
                            className={`${styles.container} + ${colorStyles.container} + ${isAvailableMethodsContentShown ? colorStyles.active : ''}`}
                            onClick={() => setIsAvailableMethodsContentShown(prev => !prev)}
                        >
                            <div
                                className={`${styles.chevron} + ${colorStyles.chevron}`}
                            >{isAvailableMethodsContentShown ? <FiIcons.FiChevronDown/> : <FiIcons.FiChevronRight/>}</div>
                            {labels.headers.availableMethods}</div>
                        {isAvailableMethodsContentShown &&
                        <div className={`${styles.headerContent} + ${colorStyles.headerContent}`}>
                            <a href='#save'>save</a>
                            <a href='#find'>find</a>
                            <a href='#findById'>findById</a>
                            <a href='#findOne'>findOne</a>
                            <a href='#findByIdAndUpdate'>findByIdAndUpdate</a>
                            <a href='#findByIdAndDelete'>findByIdAndDelete</a>
                        </div>}
                    </div>}

                    <div
                        className={`${styles.headerContent} + ${colorStyles.headerContent}`}
                        style={{margin: '0'}}
                    >
                        <a href={`#${docsLabels.en.headers.errors}`}>{labels.headers.errors}</a>
                    </div>

                </div>}

            </div>

        </div>
    )
}

export default memo(Navbar)