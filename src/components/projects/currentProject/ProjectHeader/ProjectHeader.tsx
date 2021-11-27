import React, {FC, memo, useEffect, useState} from 'react'
import styles from './ProjectHeader.module.css'
import * as FiIcons from 'react-icons/fi'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks/redux'
import {projectHeaderLabels, ProjectHeaderLabelsType} from './projectHeaderLabels'
import CopyToClipboard from 'react-copy-to-clipboard'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'
import {useHistory} from 'react-router-dom'
import {LoadingGag} from '../../../common/LoadingGag/LoadingGag'
import Switch from '../../../common/Switch/Switch'
import {shareProject} from '../../../../redux/store/reducers/projects/projectsThunkCreators'


const ProjectHeader: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {token, authUserData} = useAppSelector(state => state.authReducer)
    const {currentProject} = useAppSelector(state => state.projectsReducer)
    const {width} = useWindowDimensions()
    const history = useHistory()
    const dispatch = useAppDispatch()

    const colorStyles = require(`./ProjectHeader${theme}.module.css`)
    const labels: ProjectHeaderLabelsType = projectHeaderLabels[language]

    const onBackClick = (): void => {
        history.goBack()
    }

    const borderlineWidth = 830

    const [isBackLabel, setIsBackLabel] = useState<boolean>(width > borderlineWidth)

    useEffect(() => {
        if (width < borderlineWidth && isBackLabel) {
            setIsBackLabel(false)
        }
        if (width > borderlineWidth && !isBackLabel) {
            setIsBackLabel(true)
        }
    }, [width])

    const shareProjectSwitcher = () => dispatch(shareProject({
        token: token!,
        data: {projectId: currentProject!._id}
    }))

    return (
        <div className={`${styles.header} + ${colorStyles.header}`}>

            {currentProject && authUserData && currentProject.ownerId === authUserData.id &&
            <div style={{flex: '1'}}><div
                className={`${styles.backBtn} + ${colorStyles.backBtn}`}
                onClick={onBackClick}
            >
                <span
                    className={`${styles.icon} + ${colorStyles.icon}`}
                    title={!isBackLabel ? labels.backToProjects : ''}
                ><FiIcons.FiChevronLeft/></span>
                {isBackLabel && <span className={styles.backBtnLabel}>{labels.backToProjects}</span>}
            </div></div>}


            <div
                className={`${styles.projectName} + ${colorStyles.projectName}`}
            >{currentProject
                ? currentProject.projectName
                : <LoadingGag width={200} size={'premedium'}/>}</div>


            {currentProject && authUserData && currentProject.ownerId === authUserData.id &&
                <div className={`${styles.projectId} + ${colorStyles.projectId}`}>
                <span className={styles.projectIdLabel}>{labels.projectId}: </span>
                <CopyToClipboard text={currentProject ? currentProject._id : ''}>
                    <span
                        className={`${styles.id} + ${colorStyles.id}`}
                    >{currentProject._id}</span>
                </CopyToClipboard>

                <Switch
                    setProp={shareProjectSwitcher}
                    prop1={false}
                    prop2={true}
                    currentProp={currentProject.shared}
                    icons={
                        {
                            icon1: <FiIcons.FiShare2/>,
                            icon2: <FiIcons.FiEyeOff/>
                        }
                    }
                    title={currentProject.shared ? labels.setPrivate : labels.setPublic}
                />
            </div>}

        </div>
    )
}

export default memo(ProjectHeader)