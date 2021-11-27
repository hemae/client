import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Project} from '../../../models/Project'
import {projectHandlerThunkCreator, projectsHandlerThunkCreator} from './projectsThunkCreators'


type ProjectsStateType = {
    projects: Project[]
    projectsLoadingError: string
    isProjectsLoading: boolean
    currentProject: Project | null
}

const initialState: ProjectsStateType = {
    projects: [],
    projectsLoadingError: '',
    isProjectsLoading: false,
    currentProject: null
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setCurrentProject(state: ProjectsStateType, action: PayloadAction<Project | null>) {
            state.currentProject = action.payload
        }
    },
    extraReducers: {

        [projectsHandlerThunkCreator.pending.type]: (state: ProjectsStateType) => {
            state.isProjectsLoading = true
        },
        [projectsHandlerThunkCreator.fulfilled.type]: (state: ProjectsStateType, action: PayloadAction<Project[]>) => {
            state.projectsLoadingError = ''
            state.projects = action.payload
            state.isProjectsLoading = false
        },
        [projectsHandlerThunkCreator.rejected.type]: (state: ProjectsStateType, action: PayloadAction<string>) => {
            state.projectsLoadingError = action.payload
            state.isProjectsLoading = false
        },

        [projectHandlerThunkCreator.pending.type]: (state: ProjectsStateType) => {
            state.isProjectsLoading = true
        },
        [projectHandlerThunkCreator.fulfilled.type]: (state: ProjectsStateType, action: PayloadAction<Project>) => {
            state.projectsLoadingError = ''
            state.currentProject = action.payload
            state.isProjectsLoading = false
        },
        [projectHandlerThunkCreator.rejected.type]: (state: ProjectsStateType, action: PayloadAction<string>) => {
            state.projectsLoadingError = action.payload
            state.isProjectsLoading = false
        }
    }
})


export default projectsSlice.reducer