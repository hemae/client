import React, {FC, memo, useEffect, useState} from 'react'
import styles from './MyProjects.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {myProjectsLabels, MyProjectsLabelsType} from './myProjectsLabels'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import {PROJECT_FULL_WIDTH} from '../../components/projects/stylesConsts'
import {APP_SIDE_PADDING} from '../../App/stylesConsts'
import {getProjects} from '../../redux/store/reducers/projects/projectsThunkCreators'
import createGrid from '../../helpers/createGrid'
import {Project as ProjectType} from '../../redux/models/Project'
import Project from '../../components/projects/projects/Project/Project'
import AddProject from '../../components/projects/projects/AddProject/AddProject'
import Loader from '../../components/common/Loader/Loader'


function selector(rowSize: number, borderlineValue: number, subBorderlineValue: number) {
    return rowSize < borderlineValue
        ? rowSize > subBorderlineValue
            ? subBorderlineValue
            : rowSize
        : borderlineValue
}

function getRowSize(width: number, itemWidth: number, sumAppSidePadding: number) {
    return Math.floor((width - sumAppSidePadding) / itemWidth)
}

const MAX_PROJECTS_IN_ROW = 5

const MyProjects: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {token} = useAppSelector(state => state.authReducer)
    const {isProjectsLoading, projects} = useAppSelector(state => state.projectsReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./MyProjects${theme}.module.css`)
    const labels: MyProjectsLabelsType = myProjectsLabels[language]

    const {width} = useWindowDimensions()

    const [rowSize, setRowSize] = useState<number>(selector(
        getRowSize(width, PROJECT_FULL_WIDTH, APP_SIDE_PADDING * 2),
        MAX_PROJECTS_IN_ROW, projects.length + 1))

    useEffect(() => {
        setRowSize(selector(
            getRowSize(width, PROJECT_FULL_WIDTH, APP_SIDE_PADDING * 2),
            MAX_PROJECTS_IN_ROW, projects.length + 1))
    }, [width, projects])

    useEffect(() => {
        if (token) {
            dispatch(getProjects({token}))
        }
    }, [])

    const projectsGrid = createGrid<ProjectType>(projects, rowSize, true)

    return (
        <>

            <div
                className={`${styles.header} + ${colorStyles.header}`}>
                {`${labels.myProjects} (${projects.length})`}
            </div>

            <div className={`${styles.projects} + ${colorStyles.projects}`}>

                {projectsGrid.map((projectsRow, index) => <div
                    key={index}
                    className={styles.projectsRow}
                    style={{width: `${rowSize * PROJECT_FULL_WIDTH}px`}}
                >

                    {projectsRow.map((project, index) => <Project
                        key={index}
                        project={project}
                    />)}

                    {index === projectsGrid.length - 1 && <AddProject/>}

                </div>)}

            </div>

            <div
                className={styles.loader}
            >{isProjectsLoading && <Loader size={40}/>}</div>

        </>
    )
}

export default memo(MyProjects)