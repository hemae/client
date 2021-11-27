import React, {FC, memo} from 'react'
import styles from './Item.module.css'
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks/redux'
import {itemLabels, ItemLabelsType} from './itemLabels'
import * as FiIcons from 'react-icons/fi'
import {popUpSlice} from '../../../../../redux/store/reducers/popUp/popUpSlice'
import {CollectionsApiOptionsType} from '../../../../../redux/api/collectionsAPI'
import {deleteItem} from '../../../../../redux/store/reducers/collections/collectionsThunkCreators'
import Value from './Value/Value'


type ItemPropsType = {
    item: any
}

const Item: FC<ItemPropsType> = ({item}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {authUserData} = useAppSelector(state => state.authReducer)
    const {page} = useAppSelector(state => state.collectionReducer)
    const {currentProject} = useAppSelector(state => state.projectsReducer)
    const {currentCollection} = useAppSelector(state => state.collectionReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./Item${theme}.module.css`)
    const labels: ItemLabelsType = itemLabels[language]

    const deleteCollectionFunction = (payload: CollectionsApiOptionsType) => dispatch(deleteItem(payload))

    const onDeleteClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'DeleteItem',
            props: {
                rightBtnFunction: deleteCollectionFunction,
                projectId: currentProject!._id,
                collectionName: currentCollection,
                itemId: item._id,
                message: labels.areYouSureToDelete,
                page
            }
        }))
    }

    return (
        <div className={`${styles.item} + ${colorStyles.item}`}>
            <Value value={item} isOpened={true}/>
            {authUserData && currentProject && authUserData.id === currentProject.ownerId &&
                <div
                    className={`${styles.deleteBtn} + ${colorStyles.deleteBtn}`}
                    onClick={onDeleteClick}
                ><FiIcons.FiX/></div>}
        </div>
    )
}

export default memo(Item)