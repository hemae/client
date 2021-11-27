import React, {FC, memo} from 'react'
import TextNotification from '../wrappers/AlertPopUpWrapper/AlertPopUpWrapper'
import {UniqueId} from '../../../redux/models/common'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {CollectionsApiOptionsType} from '../../../redux/api/collectionsAPI'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


type DeleteItemPopUpPropsType = {
    message: string
    rightBtnFunction: (payload: CollectionsApiOptionsType) => void
    projectId: UniqueId
    collectionName: string
    itemId: UniqueId
    page: number
}

const DeleteItemPopUp: FC<DeleteItemPopUpPropsType> = (props) => {

    const {
        rightBtnFunction,
        message,
        projectId,
        collectionName,
        itemId,
        page
    } = props

    const {token} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const rightBtnHandler = (): void => {
        if (token) {
            rightBtnFunction({token, data: {projectId, collectionName, itemId, page}})
        }
        dispatch(popUpSlice.actions.closePopUp())
    }

    return (
        <TextNotification
            rightBtnHandler={rightBtnHandler}
            message={message}
        />
    )
}

export default memo<DeleteItemPopUpPropsType>(DeleteItemPopUp)
