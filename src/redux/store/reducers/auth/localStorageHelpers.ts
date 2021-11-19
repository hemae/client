import {User} from '../../../models/User'


export const setStorageAppUserData = (payload: {
    token: string,
    authUserData: User
}) => {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('storageUser', JSON.stringify(payload.authUserData))
}

export const removeStorageAppUserData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('storageUser')
}