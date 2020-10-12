import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Landing from './pages/Landing'
import Orphanages from './pages/OrphanagesMap'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/app' component={Orphanages} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>
)

export default Routes