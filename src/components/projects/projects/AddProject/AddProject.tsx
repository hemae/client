import React, {FC, memo, useState} from 'react'
import styles from './AddProject.module.css'
import * as FiIcons from 'react-icons/fi'
import {addProjectLabels, AddProjectLabelsType} from './addProjectLabels'
import ItemWrapper from '../../../common/ItemWrapper/ItemWrapper'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks/redux'
import {createProject} from '../../../../redux/store/reducers/projects/projectsThunkCreators'
import {ProjectsApiOptionsType} from '../../../../redux/api/projectsAPI'
import {PROJECT_HEIGHT, PROJECT_MARGIN, PROJECT_WIDTH} from '../../stylesConsts'
import {popUpSlice} from '../../../../redux/store/reducers/popUp/popUpSlice'


const AddProject: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./AddProject${theme}.module.css`)
    const labels: AddProjectLabelsType = addProjectLabels[language]

    const [isHover, setIsHover] = useState<boolean>(false)

    const createProjectFunction = (payload: ProjectsApiOptionsType) => dispatch(createProject(payload))

    const onAddProjectClick = (): void => {
        dispatch(popUpSlice.actions.showPopUp({
            renderingComponent: 'CreateRenameProject',
            props: {
                rightBtnFunction: createProjectFunction
            }
        }))
    }

    const onItemOver = (): void => {
        setIsHover(true)
    }

    const onItemLeave = (): void => {
        setIsHover(false)
    }

    return (
        <ItemWrapper
            child={
                <div
                    className={`${styles.project} + ${colorStyles.project}`}
                    onMouseOver={onItemOver}
                    onMouseLeave={onItemLeave}
                    style={{
                        width: `${PROJECT_WIDTH}px`,
                        height: `${PROJECT_HEIGHT}px`
                    }}
                >
                    <div className={styles.icon}><FiIcons.FiPlus/></div>
                    <span>{labels.addProject}</span>
                </div>
            }
            onClickHandler={onAddProjectClick}
            opacity={isHover ? '0.7' : '0.4'}
            margin={`${PROJECT_MARGIN}px`}
        />
    )
}

export default memo(AddProject)