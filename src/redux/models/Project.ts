import {UniqueId} from './common'

export type Date = number

export type Project = {
    _id: UniqueId
    projectName: string
    ownerId: string
    shared: boolean
    _creationDate: Date
    _updatingDate: Date | null
}