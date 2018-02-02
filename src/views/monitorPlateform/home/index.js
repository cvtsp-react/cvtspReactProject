import React from 'react'
import {connect} from 'react-redux'
import {Component, Chart} from 'components'
import VehicleCount from './vehicleCount'
import './style/index.less'

@connect(state => {return Object.assign({}, state.monitorHome)})
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            vehicleCount: {}
        }
    }
    render(){
        return (
            <div className="monitor-home">
                <Chart name="map" className="home-mapchart" />
                <VehicleCount data={this.state.vehicleCount} className="home-count"/>
            </div>
        )
    }
    componentWillMount(){
        this.http({
            url: this.props.findVehicleOnlineCountApi,
            method: 'GET'
        }).then(mess => {
            const {data, flag} = mess;
            flag && this.setState({vehicleCount: data})
        })
    }
}
