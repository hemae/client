import React, {FC, useEffect, useState} from 'react'
import styles from './Projects.module.css'
import ProjectComponent from '../../components/projects/Project/Project'
import {withProjectsContextProps} from './projectsHOC'
import {ProjectsContextPropsType, ProjectsExternalPropsType} from './ProjectsTypes'
import {Project} from '../../redux/models/Project'
import createProjectsGrid from './helpers/createProjectsGrid'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import AddProject from '../../components/projects/AddProject/AddProject'
import Loader from '../../components/common/Loader/Loader'
import {projectsLabels, ProjectsLabelsType} from './projectsLabels'


const Projects: FC<ProjectsContextPropsType & ProjectsExternalPropsType> = ({
                                                                                projects,
                                                                                getProjectsData,
                                                                                isProjectsLoading,
                                                                                isProjectsSending,
                                                                                language,
                                                                                theme,
                                                                                token
                                                                            }) => {

    const colorStyles = require(`./Projects${theme}.module.css`)
    const labels: ProjectsLabelsType = projectsLabels[language]

    const {width} = useWindowDimensions()

    let _rowSize = Math.floor((width - 20 * 2) / 160)
    const [rowSize, setRowSize] = useState<number>(
        _rowSize < 5
            ? _rowSize > projects.length + 1
                ? projects.length + 1
                : _rowSize
            : 5
    )

    const [projectsGrid, setProjectsGrid] = useState<Project[][]>(createProjectsGrid({
        projects,
        rowSize
    }))

    useEffect(() => {
        _rowSize = Math.floor((width - 20 * 2) / 160)
        setRowSize(
            _rowSize < 5
                ? _rowSize > projects.length + 1
                    ? projects.length + 1
                    : _rowSize
                : 5
        )
    }, [width, projects])

    useEffect(() => {
        setProjectsGrid(createProjectsGrid({
            projects,
            rowSize
        }))
    }, [rowSize, projects])

    useEffect(() => {
        getProjectsData(token)
    }, [])

    if (isProjectsLoading) {
        return <div className={`${styles.header} + ${colorStyles.header}`} style={{background: 'none'}}><Loader
            size={60}/></div>
    }

    return (
        <>

            <div
                className={`${styles.header} + ${colorStyles.header}`}>{`${labels.myProjects} (${projects.length})`}</div>

            <div className={`${styles.projects} + ${colorStyles.projects}`}
                 style={{
                     width: `${width - 40}px`,
                     height: `${projectsGrid.length * 160}px`
                 }}
            >
                {projectsGrid.map((projectsRow, index) => <div
                    key={index}
                    className={styles.projectsRow}
                    style={{width: `${rowSize * 160}px`}}
                >
                    {projectsRow.map((project, index) => <ProjectComponent
                        key={index}
                        project={project}
                    />)}
                    {index === projectsGrid.length - 1 && <AddProject/>}
                </div>)}
            </div>

            {isProjectsSending && <div className={`${styles.header} + ${colorStyles.header}`}
                                       style={{
                                           fontSize: '18px',
                                           margin: '10px 0 0 0',
                                           background: 'none'
                                       }}
            ><Loader size={26}/></div>}

        </>
    )
}

export default withProjectsContextProps(Projects) as FC<ProjectsExternalPropsType>