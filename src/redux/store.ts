import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {projectsReducer} from './projects/projectsReducer'
import {authReducer} from './auth/authReducer'
import {settingsReducer} from './settings/settingsReducer'


const reducers = combineReducers({
    settings: settingsReducer,
    auth: authReducer,
    projects: projectsReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store