import React, {FC, memo, useEffect} from 'react'
import styles from './CollectionList.module.css'
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks/redux'
import {collectionListLabels, CollectionListLabelsType} from './collectionListLabels'
import CollectionName from './CollectionName/CollectionName'
import Loader from '../../../common/Loader/Loader'
import {getCollectionNames} from '../../../../redux/store/reducers/collections/collectionsThunkCreators'
import {useHistory} from 'react-router-dom'


const CollectionList: FC = () => {

    const {theme, language} = useAppSelector(state => state.settingsReducer)
    const {collectionNames} = useAppSelector(state => state.collectionReducer)
    const {token} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const colorStyles = require(`./CollectionList${theme}.module.css`)
    const labels: CollectionListLabelsType = collectionListLabels[language]

    useEffect(() => {
        const splitPathname = history.location.pathname.split('/')
        const projectId = splitPathname[splitPathname.length - 1]
        dispatch(getCollectionNames({
            token: token || '',
            data: {
                projectId
            }
        }))
    }, [])

    if (!collectionNames) {
        return <div className={styles.loaderContainer}><Loader size={40}/></div>
    }

    return (
        <div className={`${styles.collectionList} + ${colorStyles.collectionList}`}>
            {!!collectionNames.length && <div className={`${styles.header} + ${colorStyles.header}`}>{`${labels.collections} (${collectionNames.length})`}</div>}
            <div className={styles.namesContainer}>
                {!collectionNames.length
                    ? <div className={`${styles.header} + ${colorStyles.header}`}>{labels.noCollections}</div>
                    : collectionNames.map((collectionName, index) => <CollectionName
                        key={index}
                        collectionName={collectionName}
                    />)}
            </div>
        </div>
    )
}

export default memo(CollectionList)