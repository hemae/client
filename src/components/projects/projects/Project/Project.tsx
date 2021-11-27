import React, {FC, memo, useState} from 'react'
import styles from './Project.module.css'
import * as FiIcons from 'react-icons/fi'
import {projectLabels, ProjectLabelsType} from './projectLabels'
import ItemWrapper from '../../../common/ItemWrapper/ItemWrapper'
import EditTools from './EditTools/EditTools'
import {useAppSelector} from '../../../../redux/hooks/redux'
import {Project as ProjectType} from '../../../../redux/models/Project'
import {PROJECT_HEIGHT, PROJECT_MARGIN, PROJECT_WIDTH} from '../../stylesConsts'
import {NavLink} from 'react-router-dom'


type ProjectPropsType = {
    project: ProjectType
}

const Project: FC<ProjectPropsType> = ({project}) => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)

    const colorStyles = require(`./Project${theme}.module.css`)
    const labels: ProjectLabelsType = projectLabels[language]

    const [isEditToolsShown, setIsEditToolsShown] = useState<boolean>(false)
    const [isOnTools, setIsOnTools] = useState<boolean>(false)

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
        <ItemWrapper
            child={
                <NavLink
                    to={!isOnTools ? `/projects/${project._id}` : '/projects'}
                    className={`${styles.project} + ${colorStyles.project}`}
                    onMouseOver={onProjectMouseOver}
                    onMouseLeave={onProjectMouseLeave}
                    style={{
                        width: `${PROJECT_WIDTH}px`,
                        height: `${PROJECT_HEIGHT}px`
                    }}
                >

                    {isEditToolsShown &&
                    <EditTools
                        projectName={project.projectName}
                        projectId={project._id}
                        setIsOnTools={setIsOnTools}
                    />}

                    <div className={styles.icon}><FiIcons.FiDatabase/></div>
                    <span className={styles.projectName}>{nameLabel}</span>
                    <span className={styles.creationDate}>{dateLabel}</span>

                </NavLink>
            }
            margin={`${PROJECT_MARGIN}px`}
            title={
                `${
                    project.projectName
                } (${
                    addDateLabel}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()
                })`
            }
        />
    )
}

export default memo<ProjectPropsType>(Project)