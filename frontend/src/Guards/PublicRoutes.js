import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import LoginForm from '../Pages/PublicPages/LoginForm';
import Signup from "../Pages/PublicPages/Signup";
export default function PublicRoutes() {

    return (
        <>
        <Switch>
            <Route path={'/'} exact={true} component={LoginForm}/>
            <Route path={'/signup'} exact={true} component={Signup}/>
        </Switch>
        </>
    )
}