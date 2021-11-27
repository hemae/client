import React, {FC, memo, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import PopUpBackground from './PopUpBackground/PopUpBackground'
import AuthCard from './AuthCard/AuthCard'
import styles from './PopUp.module.css'
import CreateRenameProjectPopUp from './projectsPopUps/CreateRenameProjectPopUp'
import DeleteProjectPopUp from './projectsPopUps/DeleteProjectPopUp'
import {popUpSlice} from '../../redux/store/reducers/popUp/popUpSlice'
import DeleteCollectionPopUp from './collectionsPopUps/DeleteCollectionPopUp'
import DeleteItemPopUp from './collectionsPopUps/DeleteItemPopUp'


const PopUp: FC = () => {

    const {popUpOptions} = useAppSelector(state => state.popUpReducer)
    const dispatch = useAppDispatch()

    const [localIsShown, setLocalIsShown] = useState<boolean>(false)
    const [isOnContentOver, setIsOnContentOver] = useState<boolean>(false)

    useEffect(() => {
        setLocalIsShown(true)
    }, [])

    let RenderingJSX: JSX.Element = <></>

    switch (popUpOptions.renderingComponent) {
        case 'AuthCard':
            RenderingJSX = <AuthCard {...popUpOptions.props}/>
            break
        case 'CreateRenameProject':
            RenderingJSX = <CreateRenameProjectPopUp {...popUpOptions.props}/>
            break
        case 'DeleteProject':
            RenderingJSX = <DeleteProjectPopUp {...popUpOptions.props}/>
            break
        case 'DeleteCollection':
            RenderingJSX = <DeleteCollectionPopUp {...popUpOptions.props}/>
            break
        case 'DeleteItem':
            RenderingJSX = <DeleteItemPopUp {...popUpOptions.props}/>
            break
        default:
            RenderingJSX = <></>
    }

    const onPopUpBackgroundClick = (): void => {
        if (!isOnContentOver) {
            dispatch(popUpSlice.actions.closePopUp())
        }
    }

    const onContentOver = (): void => {
        setIsOnContentOver(true)
    }

    const onContentLeave = (): void => {
        setIsOnContentOver(false)
    }

    return (
        <>

            <PopUpBackground/>

            <div
                className={`${styles.popUp} + ${localIsShown ? styles.active : ''}`}
                onMouseDown={onPopUpBackgroundClick}
            >

                <div
                    onMouseOver={onContentOver}
                    onMouseLeave={onContentLeave}
                >{RenderingJSX}</div>

            </div>

        </>

    )
}

export default memo(PopUp)