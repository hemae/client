import React, {FC, memo} from 'react'
import TextNotification from '../wrappers/AlertPopUpWrapper/AlertPopUpWrapper'
import {UniqueId} from '../../../redux/models/common'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {CollectionsApiOptionsType} from '../../../redux/api/collectionsAPI'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


type DeleteCollectionPopUpPropsType = {
    message: string
    rightBtnFunction: (payload: CollectionsApiOptionsType) => void
    projectId: UniqueId
    collectionName: string
}

const DeleteCollectionPopUp: FC<DeleteCollectionPopUpPropsType> = (props) => {

    const {
        rightBtnFunction,
        message,
        projectId,
        collectionName
    } = props

    const {token} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const rightBtnHandler = (): void => {
        if (token) {
            rightBtnFunction({token, data: {projectId, collectionName}})
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

export default memo<DeleteCollectionPopUpPropsType>(DeleteCollectionPopUp)
