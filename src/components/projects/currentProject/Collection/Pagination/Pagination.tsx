import React, {FC, memo} from 'react'
import styles from './Pagination.module.css'
import {paginationLabels, PaginationLabelsType} from './paginationLabels'
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks/redux'
import * as FiIcons from 'react-icons/fi'
import {getCollection} from '../../../../../redux/store/reducers/collections/collectionsThunkCreators'


const Pagination: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {pages, page} = useAppSelector(state => state.collectionReducer)
    const {token} = useAppSelector(state => state.authReducer)
    const {currentProject} = useAppSelector(state => state.projectsReducer)
    const {currentCollection} = useAppSelector(state => state.collectionReducer)
    const dispatch = useAppDispatch()

    const colorStyles = require(`./Pagination${theme}.module.css`)
    const labels: PaginationLabelsType = paginationLabels[language]

    const onRightClick = (): void => {
        if (currentProject && currentCollection && page) {
            dispatch(getCollection({
                token: token || '',
                data: {projectId: currentProject._id, collectionName: currentCollection, page: page + 1}
            }))
        }
    }

    const onLeftClick = (): void => {
        if (currentProject && currentCollection && page) {
            dispatch(getCollection({
                token: token || '',
                data: {projectId: currentProject._id, collectionName: currentCollection, page: page - 1}
            }))
        }
    }

    return (
        <div className={`${styles.pagination} + ${colorStyles.pagination}`}>

            {page && page > 1 ?
                <div
                    className={`${styles.arrow} + ${colorStyles.arrow}`}
                    onClick={onLeftClick}
                ><FiIcons.FiChevronLeft/></div>
                : <div
                    className={`${styles.arrow} + ${colorStyles.arrow}`}
                ></div>}

            <span className={styles.label}>{page}/{pages}</span>

            {page && page !== pages ?
                <div
                    className={`${styles.arrow} + ${colorStyles.arrow}`}
                    onClick={onRightClick}
                ><FiIcons.FiChevronRight/></div>
                : <div
                    className={`${styles.arrow} + ${colorStyles.arrow}`}
                ></div>}

        </div>
    )
}

export default memo(Pagination)