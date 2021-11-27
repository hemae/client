import React, {FC, memo, useEffect, useState} from 'react'
import styles from './CurrentProject.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {currentProjectLabels, CurrentProjectLabelsType} from './currentProjectLabels'
import CollectionList from '../../components/projects/currentProject/CollectionList/CollectionList'
import {projectsSlice} from '../../redux/store/reducers/projects/projectsSlice'
import ProjectHeader from '../../components/projects/currentProject/ProjectHeader/ProjectHeader'
import Collection from '../../components/projects/currentProject/Collection/Collection'
import {collectionsSlice} from '../../redux/store/reducers/collections/collectionsSlice'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import * as FiIcons from 'react-icons/fi'
import {useHistory} from 'react-router-dom'
import {getProject} from '../../redux/store/reducers/projects/projectsThunkCreators'


const CurrentProject: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {token} = useAppSelector(state => state.authReducer)
    const {projectsLoadingError} = useAppSelector(state => state.projectsReducer)
    const {width} = useWindowDimensions()
    const dispatch = useAppDispatch()
    const history = useHistory()

    const colorStyles = require(`./CurrentProject${theme}.module.css`)
    const labels: CurrentProjectLabelsType = currentProjectLabels[language]

    const borderlineWidth = 830

    const [isCollectionListHidden, setIsCollectionListHidden] = useState<boolean>(width < borderlineWidth)
    const [isCollectionListShown, setIsCollectionListShown] = useState<boolean>(false)

    const onShowOver = (): void => {
        setIsCollectionListShown(true)
    }

    const onCollectionListLeave = (): void => {
        setIsCollectionListShown(false)
    }

    useEffect(() => {
        if (width < borderlineWidth && !isCollectionListHidden) {
            setIsCollectionListHidden(true)
        }
        if (width > borderlineWidth && isCollectionListHidden) {
            setIsCollectionListHidden(false)
            setIsCollectionListShown(false)
        }
    }, [width])

    useEffect(() => {
        const splitPathname = history.location.pathname.split('/')
        const projectId = splitPathname[splitPathname.length - 1]
        dispatch(getProject({token: token || '', data: {projectId}}))

        return () => {
            dispatch(projectsSlice.actions.setCurrentProject(null))
            dispatch(collectionsSlice.actions.unsetItems())
        }
    }, [])

    return (
        <div className={styles.currentProject}>

            {projectsLoadingError === 'No access'
                ? <span className={`${styles.refresh} + ${colorStyles.noAccess}`}>{labels.noAccess}</span>
                : <>
                    <ProjectHeader/>
                    <div className={styles.content}>

                        {!isCollectionListHidden &&
                        <div
                            className={`${styles.collectionList} + ${colorStyles.collectionList}`}
                        ><CollectionList/></div>}

                        {isCollectionListHidden &&
                        <div
                            className={`${styles.showList} + ${colorStyles.showList}`}
                            onMouseOver={onShowOver}
                        ><FiIcons.FiAlignLeft/></div>}

                        <Collection/>

                        {isCollectionListHidden &&
                        <div
                            className={`${styles.collectionListHidden} + ${colorStyles.collectionListHidden} + ${isCollectionListShown ? styles.shown : ''}`}
                            onMouseLeave={onCollectionListLeave}
                        ><CollectionList/></div>}


                    </div>
                </>
            }


        </div>
    )
}

export default memo(CurrentProject)