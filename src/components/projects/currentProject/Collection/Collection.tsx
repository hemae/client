import React, {FC, memo} from 'react'
import styles from './Collection.module.css'
import {useAppSelector} from '../../../../redux/hooks/redux'
import {collectionLabels, CollectionLabelsType} from './collectionLabels'
import Item from './Item/Item'
import Pagination from './Pagination/Pagination'


const Collection: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {currentProject} = useAppSelector(state => state.projectsReducer)
    const {currentCollection, items, pages, count, page} = useAppSelector(state => state.collectionReducer)

    const colorStyles = require(`./Collection${theme}.module.css`)
    const labels: CollectionLabelsType = collectionLabels[language]

    return (
        <div className={styles.collection}>

            <div className={styles.toolsHeader}>

                {!!pages && !!count && !!page && count > 0 &&
                <div className={`${styles.count} + ${colorStyles.count}`}
                >{labels.total}: {count}</div>}

                {!!pages && pages > 1 && <Pagination/>}

                {currentProject && currentCollection && !!count &&
                <a
                    className={`${styles.apiBtn} + ${colorStyles.apiBtn}`}
                    href={`http://workcard/api/client/collections/${currentProject._id}/${currentCollection}/${page}`}
                >API</a>}

            </div>

            {items
                ? items.length === 0
                    ? <div className={`${styles.header} + ${colorStyles.header}`}>{labels.noObjectsYet}</div>
                    : items.map((item, index) => <Item key={index} item={item}/>)
                : <div className={`${styles.header} + ${colorStyles.header}`}>{labels.chooseACollection}</div>}

        </div>
    )
}

export default memo(Collection)