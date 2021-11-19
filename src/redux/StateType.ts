import {ProjectsStateType} from './projects/projectsTypes'
import {AuthStateType} from './auth/authTypes'
import {SettingsStateType} from './settings/settingsTypes'


export type StateType = {
    settings: SettingsStateType
    auth: AuthStateType
    projects: ProjectsStateType
}