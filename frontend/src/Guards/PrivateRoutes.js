import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard  from '../Pages/PrivatePages/Dashboard';
import Profile from "../Pages/PrivatePages/Profile"
export default function PrivateRoutes() {
    return (
        <>
        <Switch>
            <Route path={'/auth/dashboard'} component={Dashboard}/>
            <Route path={'/auth/profile'} component={Profile}/>
        </Switch>
        </>
    )
}
