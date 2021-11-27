import React, {FC, memo} from 'react'
import TextNotification from '../wrappers/AlertPopUpWrapper/AlertPopUpWrapper'
import {UniqueId} from '../../../redux/models/common'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {ProjectsApiOptionsType} from '../../../redux/api/projectsAPI'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


type DeleteProjectPopUpPropsType = {
    message: string
    rightBtnFunction: (payload: ProjectsApiOptionsType) => void
    projectId: UniqueId
}

const DeleteProjectPopUp: FC<DeleteProjectPopUpPropsType> = (props) => {

    const {
        rightBtnFunction,
        message,
        projectId
    } = props

    const {token} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    const rightBtnHandler = (): void => {
        if (token) {
            rightBtnFunction({token, data: {projectId}})
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

export default memo<DeleteProjectPopUpPropsType>(DeleteProjectPopUp)
