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
    loader: () => import('views/monitorPlateform/VehicleMonitor/multi-monitor'),
    loading: MyLoadingComponent
})
const VehicleupdownLog = Loadable({
    loader: () => import ('views/monitorPlateform/logging/vehicleUpDownLog'),
    loading: MyLoadingComponent
})
<<<<<<< HEAD
const FatigueDriving = Loadable({
    loader: () => import ('views/monitorPlateform/statistics/fatigueDriving'),
    loading: MyLoadingComponent
})
=======

>>>>>>> 1f162b840199cc00f4317ecaba145b8436a49503
export default class RouteMonitor extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/monitor/home" component={Home} />
                <Route exact path="/monitor/vehicleIsOnlineLog" component={VehicleupdownLog} />
<<<<<<< HEAD
                <Route exact path="/monitor/fatigueDriving" component={FatigueDriving} />
=======
                <Route exact path="/monitor/VehicleMonitor/multi-monitor" component={MultiVehicle}/>
>>>>>>> 1f162b840199cc00f4317ecaba145b8436a49503
                {/* <Route exact path="/app/auth/routerEnter" component={(props) => this.requireAuth('auth/testPage', <RouterEnter {...props} />)} />

                <Route render={() => <Redirect to="/404" />} /> */}
            </Switch>
        )
    }
}