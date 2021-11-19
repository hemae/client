import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Project} from '../../../models/Project'
import {projectHandlerThunkCreator} from './projectsThunkCreators'


type ProjectsStateType = {
    projects: Project[]
    projectsLoadingError: string
    isProjectsLoading: boolean
    isNotification: boolean
}

const initialState: ProjectsStateType = {
    projects: [],
    projectsLoadingError: '',
    isProjectsLoading: false,
    isNotification: false
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setIsNotification(state: ProjectsStateType, action: PayloadAction<boolean>) {
            state.isNotification = action.payload
        }
    },
    extraReducers: {
        [projectHandlerThunkCreator.pending.type]: (state: ProjectsStateType) => {
            state.isProjectsLoading = true
        },
        [projectHandlerThunkCreator.fulfilled.type]: (state: ProjectsStateType, action: PayloadAction<Project[]>) => {
            state.projectsLoadingError = ''
            state.projects = action.payload
            state.isProjectsLoading = false
        },
        [projectHandlerThunkCreator.rejected.type]: (state: ProjectsStateType, action: PayloadAction<string>) => {
            state.projectsLoadingError = action.payload
            state.isProjectsLoading = false
        }
    }
})


export default projectsSlice.reducer