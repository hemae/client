import React, {FC, useState} from 'react'
import styles from './AddProject.module.css'
import {
    AddProjectContextPropsType,
    AddProjectExternalPropsType
} from './AddProjectTypes'
import * as FiIcons from 'react-icons/fi'
import InputNotification from '../../common/Notification/InputNotification/InputNotification'
import {withAddProjectContextProps} from './addProjectHOC'
import {addProjectLabels, AddProjectLabelsType} from './addProjectLabels'
import ItemWrapper from '../../common/ItemWrapper/ItemWrapper'


export const AddProjectComponent: FC<AddProjectContextPropsType & AddProjectExternalPropsType> = ({
                                                                                                      createProject,
                                                                                                      isNotification,
                                                                                                      theme,
                                                                                                      language
                                                                                                  }) => {

    const colorStyles = require(`./AddProject${theme}.module.css`)
    const labels: AddProjectLabelsType = addProjectLabels[language]

    const [isNotificationShown, setIsNotificationShown] = useState<boolean>(false)
    const [isHover, setIsHover] = useState<boolean>(false)

    const onAddProjectClick = (): void => {
        if (!isNotification) {
            setIsNotificationShown(true)
        }
    }

    const leftBtnHandler = (): void => {
        setIsNotificationShown(false)
    }

    return (
        <>

            <ItemWrapper child={
                <div
                    className={`${styles.project} + ${colorStyles.project} + ${isHover ? styles.hover : ''} + ${isHover ? colorStyles.hover : ''}`}
                    onMouseOver={isNotification ? () => null : () => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <div className={styles.icon}><FiIcons.FiPlus/></div>
                    <span>{labels.addProject}</span>
                </div>
            }
                         onClickHandler={onAddProjectClick}
                         cursor={isNotification ? 'default' : 'pointer'}
                         opacity={isHover ? '0.7' : '0.5'}
            />


            {isNotificationShown && <InputNotification rightBtnFunction={createProject}
                                                       leftBtnHandler={leftBtnHandler}
                                                       isShown={isNotificationShown}
            />}

        </>
    )
}

export default withAddProjectContextProps(AddProjectComponent)