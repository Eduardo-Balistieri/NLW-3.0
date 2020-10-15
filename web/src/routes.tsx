import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Landing from './pages/Landing'
import Orphanages from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/app' component={Orphanages} />
            <Route path='/orphanages/create' component={CreateOrphanage} />
            <Route path='/orphanages/:id' component={Orphanage} />
            <Redirect to='/' />
        </Switch>
    </BrowserRouter>
)

export default Routes