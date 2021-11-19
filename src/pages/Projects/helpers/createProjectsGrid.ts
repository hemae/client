import {Project} from '../../../redux/models/Project'


type CreateProjectsGridPayloadType = {
    projects: Project[]
    rowSize: number
}

type CreateProjectsGridType = (payload: CreateProjectsGridPayloadType) => Project[][]

const createProjectsGrid: CreateProjectsGridType = ({projects, rowSize}) => {
    const projectsGrid: Project[][] = []

    const rowsCount: number = Math.ceil((projects.length + 1) / rowSize)

    for (let i = 0; i < rowsCount; i++) {
        projectsGrid.push([])
    }

    for (let i = 0; i < projects.length; i++) {
        projectsGrid[Math.floor(i / rowSize)].push(projects[i])
    }

    return projectsGrid
}

export default createProjectsGrid