import React, {FC, useState} from 'react'
import styles from './Project.module.css'
import {ProjectContextPropsType, ProjectExternalPropsType} from './ProjectTypes'
import * as FiIcons from 'react-icons/fi'
import {withProjectContextProps} from './projectHOC'
import InputNotification from '../../common/Notification/InputNotification/InputNotification'
import TextNotification from '../../common/Notification/TextNotification/TextNotification'
import {projectLabels, ProjectLabelsType} from './projectLabels'
import ItemWrapper from '../../common/ItemWrapper/ItemWrapper'
import EditTools from './EditTools/EditTools'


const Project: FC<ProjectContextPropsType & ProjectExternalPropsType> = ({
                                                                             project,
                                                                             renameProject,
                                                                             deleteProject,
                                                                             theme,
                                                                             language,
                                                                             token
                                                                         }) => {

    const colorStyles = require(`./Project${theme}.module.css`)
    const labels: ProjectLabelsType = projectLabels[language]

    const [isInputNotificationShown, setIsInputNotificationShown] = useState<boolean>(false)
    const [isDeleteNotificationShown, setIsDeleteNotificationShown] = useState<boolean>(false)

    const [isEditToolsShown, setIsEditToolsShown] = useState<boolean>(false)

    const leftBtnHandler = (): void => {
        setIsInputNotificationShown(false)
        setIsDeleteNotificationShown(false)
    }

    const onProjectMouseOver = (): void => {
        setIsEditToolsShown(true)
    }

    const onProjectMouseLeave = (): void => {
        setIsEditToolsShown(false)
    }

    const nameLabel: string = project.projectName.length > 10 ? project.projectName.slice(0, 10) + '...' : project.projectName

    const dateNum = project._updatingDate || project._creationDate
    const date = new Date(dateNum)
    const addDateLabel = project._updatingDate ? `${labels.upd}: ` : ''
    const dateLabel: string = `${addDateLabel}${
        Math.floor(dateNum / (1000 * 60 * 60 * 24)) === Math.floor(Date.now() / (1000 * 60 * 60 * 24))
            ? labels.today
            : `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }`

    return (
        <>

            <ItemWrapper
                child={
                    <div
                        className={`${styles.project} + ${colorStyles.project}`}
                        onMouseOver={onProjectMouseOver}
                        onMouseLeave={onProjectMouseLeave}
                        style={{position: `${isEditToolsShown ? 'relative' : 'initial'}`}}
                    >
                        {isEditToolsShown && <EditTools
                            isEditBarShown={isEditToolsShown}
                            setIsDeleteNotificationShown={setIsDeleteNotificationShown}
                            setIsInputNotificationShown={setIsInputNotificationShown}
                        />}

                        <div className={styles.icon}><FiIcons.FiDatabase/></div>
                        <span className={styles.projectName}>{nameLabel}</span>
                        <span className={styles.creationDate}>{dateLabel}</span>
                    </div>
                }
                title={`${project.projectName} (${addDateLabel}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()})`}
            />

            {isInputNotificationShown && <InputNotification rightBtnFunction={renameProject}
                                                            leftBtnHandler={leftBtnHandler}
                                                            isShown={isInputNotificationShown}
                                                            projectId={project._id}
                                                            projectName={project.projectName}
            />}

            {isDeleteNotificationShown && <TextNotification rightBtnFunction={deleteProject}
                                                            leftBtnHandler={leftBtnHandler}
                                                            isShown={isDeleteNotificationShown}
                                                            projectId={project._id}
                                                            message={labels.areYouSureToDeleteProject}
                                                            rightBtnLabel={labels.yes}
                                                            leftBtnLabel={labels.no}
            />}

        </>
    )
}

export default withProjectContextProps(Project) as FC<ProjectExternalPropsType>