import React, {FC, lazy, useEffect} from 'react'
import {withRoutesContextProps} from './routesHOC'
import {withSuspense} from '../../commonHOCs/withSuspense'
import {RoutesContextPropsType} from './RoutesTypes'
import {Redirect, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './Routes.module.css'

const Home: FC = lazy(() => import('../../pages/Home/Home'))
const Projects: FC = lazy(() => import('../../pages/Projects/Projects'))

const RoutesComponent: FC<RoutesContextPropsType> = ({
                                                         isAuthenticated
                                                     }) => {

    if (isAuthenticated) {
        return (
            <>
                <Header/>
                <div className={styles.container}>
                    <Switch>
                        <Route path='/' exact component={withSuspense(Home)}/>
                        <Route path='/projects' component={withSuspense(Projects)}/>
                        <Redirect to='/'/>
                    </Switch>
                </div>
            </>

        )
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <Switch>
                    <Route path='/' exact component={withSuspense(Home)}/>
                    <Redirect to='/'/>
                </Switch>
            </div>
        </>
    )
}

export default withRoutesContextProps(RoutesComponent) as FC<{}>
