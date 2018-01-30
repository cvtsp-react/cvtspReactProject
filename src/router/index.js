import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div></div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const Login = Loadable({
    loader: () => import('views/login'),
    loading: MyLoadingComponent
})
const MonitorApp = Loadable({
    loader: () => import('views/monitorPlateform/index'),
    loading: MyLoadingComponent
})

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />}/>
            <Route exact path="/m" render={() => <Redirect to="/monitor/home" />} />        
            <Route path="/login" component={Login} />
            <Route path="/monitor" component={MonitorApp} />
        </Switch>
    </Router>
)