import React, {FC, memo} from 'react'
import styles from './EditTools.module.css'
import * as FiIcons from 'react-icons/fi'
import {editToolsLabels, EditToolsLabelsType} from './editToolsLabels'
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks/redux'
import {popUpSlice} from '../../../../../redux/store/reducers/popUp/popUpSlice'
import {ProjectsApiOptionsType} from '../../../../../redux/api/projectsAPI'
import {deleteProject, renameProject} from '../../../../../redux/store/reducers/projects/projectsThunkCreators'


type EditToolsPropsType = {
    projectName: string
    projectId: string
    setIsOnTools: (isOnTools: boolean) => void
}

const EditTools: FC<EditToolsPropsType> = (props) => {

    const {
        projectName,
        projectId,
        setIsOnTools
    } = props

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./EditTools${theme}.module.css`)
    const labels: EditToolsLabelsType = editToolsLabels[language]

    const renameProjectFunction = (payload: ProjectsApiOptionsType) => dispatch(renameProject(payload))
    const deleteProjectFunction = (payload: ProjectsApiOptionsType) => dispatch(deleteProject(payload))

    const onRenameClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'CreateRenameProject',
            props: {
                rightBtnFunction: renameProjectFunction,
                projectName,
                projectId
            }
        }))
    }

    const onDeleteClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'DeleteProject',
            props: {
                rightBtnFunction: deleteProjectFunction,
                projectId,
                message: labels.areYouSureToDeleteProject
            }
        }))
    }

    const onToolsOver = (): void => {
        setIsOnTools(true)
    }

    const onToolsLeave = (): void => {
        setIsOnTools(false)
    }

    return (
        <div className={styles.tools}
             onMouseOver={onToolsOver}
             onMouseLeave={onToolsLeave}
        >
            <div
                className={`${styles.toolsBtn} + ${colorStyles.toolsBtn} + ${colorStyles.delete}`}
                title={labels.deleteProject}
                onClick={onDeleteClick}
            ><FiIcons.FiX/></div>
            <div
                className={`${styles.toolsBtn} + ${colorStyles.toolsBtn} + ${colorStyles.rename}`}
                title={labels.renameProject}
                onClick={onRenameClick}
            ><FiIcons.FiEdit3/></div>
        </div>
    )
}

export default memo<EditToolsPropsType>(EditTools)