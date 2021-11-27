import React, {FC, memo, useState} from 'react'
import styles from './CollectionName.module.css'
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks/redux'
import {collectionNameLabels, CollectionNameLabelsType} from './collectionNameLabels'
import * as FiIcons from 'react-icons/fi'
import {deleteCollection, getCollection} from '../../../../../redux/store/reducers/collections/collectionsThunkCreators'
import {popUpSlice} from '../../../../../redux/store/reducers/popUp/popUpSlice'
import {CollectionsApiOptionsType} from '../../../../../redux/api/collectionsAPI'
import {collectionsSlice} from '../../../../../redux/store/reducers/collections/collectionsSlice'


type CollectionNamePropsType = {
    collectionName: string
}

const CollectionName: FC<CollectionNamePropsType> = ({collectionName}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {token, authUserData} = useAppSelector(state => state.authReducer)
    const {currentCollection} = useAppSelector(state => state.collectionReducer)
    const {currentProject} = useAppSelector(state => state.projectsReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./CollectionName${theme}.module.css`)
    const labels: CollectionNameLabelsType = collectionNameLabels[language]

    const [isOnDelete, setIsOnDelete] = useState<boolean>(false)

    const onCollectionNameClick = (): void => {
        if (!isOnDelete && currentCollection !== collectionName && currentProject) {
            dispatch(getCollection({token: token || '', data: {projectId: currentProject._id, collectionName, page: 1}}))
        }
    }

    const onDeleteOver = (): void => {
        setIsOnDelete(true)
    }

    const onDeleteLeave = (): void => {
        setIsOnDelete(false)
    }

    const deleteCollectionFunction = (payload: CollectionsApiOptionsType) => {
        dispatch(deleteCollection(payload))
        if (currentCollection === collectionName) {
            dispatch(collectionsSlice.actions.unsetItems())
        }
    }

    const onDeleteClick = (): void => {
        if (currentProject) {
            dispatch(popUpSlice.actions.showPopUp({
                renderingComponent: 'DeleteCollection',
                props: {
                    rightBtnFunction: deleteCollectionFunction,
                    projectId: currentProject._id,
                    collectionName,
                    message: labels.areYouSureToDelete
                }
            }))
        }
    }

    return (
        <div
            className={`${
                styles.collectionName} + ${colorStyles.collectionName
            } + ${
                currentCollection === collectionName ? styles.active : ''
            } + ${
                currentCollection === collectionName ? colorStyles.active : ''
            }`}
            onClick={onCollectionNameClick}
        >
            <div className={`${styles.label} + ${colorStyles.label}`}>{collectionName}</div>
            {authUserData && currentProject && authUserData.id === currentProject.ownerId &&
            <div
                className={`${styles.deleteBtn} + ${colorStyles.deleteBtn}`}
                onMouseOver={onDeleteOver}
                onMouseLeave={onDeleteLeave}
                onClick={onDeleteClick}
            ><FiIcons.FiX/></div>}
        </div>
    )
}

export default memo(CollectionName)