import React, { Component } from 'react'
import {Bundle} from 'components'
import { Route, Redirect, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
// import Home from 'bundle-loader?lazy!views/monitorPlateform/home'


// 按需加载组件方法
const asyncRender = (component) => {
    return (props) => (
        <Bundle load={component}>
            {(Component) => <Component {...props} />}
        </Bundle>
    );
}
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
const Home = Loadable({
    loader: () => import('views/monitorPlateform/home'),
    loading: MyLoadingComponent
})
const MultiVehicle = Loadable({
    loader: () => import('views/monitorPlateform/multiVehicle'),
    loading: MyLoadingComponent
})

export default class RouteMonitor extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/monitor/home" component={Home} />
                <Route exact path="/monitor/multiCar" component={MultiVehicle} />
                {/* <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route render={() => <Redirect to="/404" />} /> */}
            </Switch>
        )
    }
}