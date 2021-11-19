import {combineReducers, configureStore} from '@reduxjs/toolkit'
import settingsReducer from './reducers/settings/settingsSlice'
import projectsReducer from './reducers/projects/projectsSlice'
import authReducer from './reducers/auth/authSlice'



const reducer = combineReducers({
    settingsReducer,
    projectsReducer,
    authReducer
})

const setupStore = () => {
    return configureStore({
        reducer
    })
}

export type State = ReturnType<typeof reducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']


export default setupStore()