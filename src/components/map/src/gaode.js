import React from 'react'
import {Component} from 'components'
import {functionDecorator} from 'decorators'
import '../style/map.less'

@functionDecorator
export default class GaodeMap extends Component {
    constructor() {
        super();
        this.state = {
            mapid: 'map',
            mapApi: null
        }
    }
    render() {
        return (
            <div className={this.className('map-base')} style={this.style()} id={this.state.mapid}></div>
        )
    }
    componentDidMount() {
        const {mapInit} = this;
        const {asyncDownloadScript} = this.props.publicMethods;
        const ak = 'edfc1f354a8b8203758949cf999b8b4b';
        asyncDownloadScript('AMap', `http://webapi.amap.com/maps?v=1.4.2&key=${ak}`)
        .then(mapInit.bind(this))
    }
    mapInit() {
        this.mapApi = new AMap.Map(this.state.mapid, {
            resizeEnable: true
        });
    }
}