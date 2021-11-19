import React, {FC} from 'react'
import styles from './EditTools.module.css'
import {EditToolsContextPropsType, EditToolsExternalPropsType} from './EditToolsTypes'
import * as FiIcons from 'react-icons/fi'
import {editToolsLabels, EditToolsLabelsType} from './editToolsLabels'
import {withEditToolsContextProps} from './editToolsHOC'


const EditTools: FC<EditToolsContextPropsType & EditToolsExternalPropsType> = ({
                                                                                   theme,
                                                                                   language,
                                                                                   isEditBarShown,
                                                                                   setIsInputNotificationShown,
                                                                                   setIsDeleteNotificationShown
                                                                               }) => {

    const colorStyles = require(`./EditTools${theme}.module.css`)
    const labels: EditToolsLabelsType = editToolsLabels[language]

    const onRenameClick = (): void => {
        setIsInputNotificationShown(true)
    }

    const onDeleteClick = (): void => {
        setIsDeleteNotificationShown(true)
    }

    return (
        <div className={styles.editBar}
             style={{position: `${isEditBarShown ? 'absolute' : 'initial'}`}}
        >
            <div
                className={`${styles.btn} + ${colorStyles.btn} + ${colorStyles.delete}`}
                title={labels.deleteProject}
                onClick={onDeleteClick}
            ><FiIcons.FiX/></div>
            <div
                className={`${styles.btn} + ${colorStyles.btn} + ${colorStyles.rename}`}
                title={labels.renameProject}
                onClick={onRenameClick}
            ><FiIcons.FiEdit3/></div>
        </div>
    )
}

export default withEditToolsContextProps(EditTools) as FC<EditToolsExternalPropsType>