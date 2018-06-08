
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


const editPages = Loadable({
    loader: () => import('views/editPages'),
    loading: MyLoadingComponent
})

const login = Loadable({
    loader: () => import('views/login'),
    loading: MyLoadingComponent
})

export default () => (
<Router>
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />

        <Route exact path="/main" render={() => <Redirect to="/editPages/editComponents" />} />      

        <Route path="/editPages" component={editPages} />

        <Route path="/login" component={login} />

    </Switch>
</Router>
)
