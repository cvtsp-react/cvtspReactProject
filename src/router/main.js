
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


const chatRoom = Loadable({
    loader: () => import('views/editPages/chatRoom'),
    loading: MyLoadingComponent
})

const editComponents = Loadable({
    loader: () => import('views/editPages/editComponents'),
    loading: MyLoadingComponent
})

const gitRequestDoc = Loadable({
    loader: () => import('views/editPages/gitRequestDoc'),
    loading: MyLoadingComponent
})

export default () => (
<Router>
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />}/>
        
        <Route path="/editPages/chatRoom/:children" component={chatRoom} />

        <Route path="/editPages/editComponents/:children" component={editComponents} />

        <Route path="/editPages/gitRequestDoc/:children" component={gitRequestDoc} />

    </Switch>
</Router>
)
