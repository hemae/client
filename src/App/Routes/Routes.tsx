import React, {FC, lazy, memo} from 'react'
import {withSuspense} from '../../commonHOCs/withSuspense'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useAppSelector} from '../../redux/hooks/redux'

const Home: FC = lazy(() => import('../../pages/Home/Home'))
const Projects: FC = lazy(() => import('../../pages/Projects/MyProjects'))
const CurrentProject: FC = lazy(() => import('../../pages/CurrentProject/CurrentProject'))
const Docs: FC = lazy(() => import('../../pages/Docs/Docs'))

const Routes: FC = () => {

    const {isAuthenticated} = useAppSelector(state => state.authReducer)

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/' exact component={withSuspense(Home)}/>
                <Route path='/projects' exact component={withSuspense(Projects)}/>
                <Route path='/projects/:projectId' component={withSuspense(CurrentProject)}/>
                <Route path='/docs' exact component={withSuspense(Docs)}/>
                <Redirect to='/'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact component={withSuspense(Home)}/>
            <Route path='/docs' exact component={withSuspense(Docs)}/>
            <Route path='/projects/:projectId' component={withSuspense(CurrentProject)}/>
            <Redirect to='/'/>
        </Switch>
    )
}

export default memo(Routes)
