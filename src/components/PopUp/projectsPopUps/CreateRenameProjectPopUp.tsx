import React, {FC, memo, useState} from 'react'
import {
    createRenameProjectPopUpLabels,
    CreateRenameProjectPopUpLabelsType
} from './createRenameProjectPopUpLabels'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import InputNotification from '../wrappers/InputPopUpWrapper/InputPopUpWrapper'
import {UniqueId} from '../../../redux/models/common'
import {ProjectsApiOptionsType} from '../../../redux/api/projectsAPI'
import {popUpSlice} from '../../../redux/store/reducers/popUp/popUpSlice'


type CreateRenameProjectPopUpPropsType = {
    rightBtnFunction: (payload: ProjectsApiOptionsType) => void
    projectName?: string
    projectId?: UniqueId
}

const CreateRenameProjectPopUp: FC<CreateRenameProjectPopUpPropsType> = (props) => {

    const {
        rightBtnFunction,
        projectName,
        projectId
    } = props

    const {language} = useAppSelector(state => state.settingsReducer)
    const {token} = useAppSelector(state => state.authReducer)
    const labels: CreateRenameProjectPopUpLabelsType = createRenameProjectPopUpLabels[language]
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>(projectName || '')

    const rightBtnHandler = (): void => {
        if (token && projectName !== value.trim()) {
            rightBtnFunction({token, data: {projectName: value.trim(), projectId: projectId}})
        }
        dispatch(popUpSlice.actions.closePopUp())
    }

    return (
        <InputNotification
            rightBtnHandler={rightBtnHandler}
            placeholder={labels.projectName}
            value={value}
            setValue={setValue}
        />
    )
}

export default memo<CreateRenameProjectPopUpPropsType>(CreateRenameProjectPopUp)