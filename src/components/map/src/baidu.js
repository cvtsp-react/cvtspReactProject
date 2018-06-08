import React from 'react'
import {Component} from 'components'
import {functionDecorator} from 'decorators'
import '../style/map.less'

@functionDecorator
export default class BaiduMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapApi: null,
            mapid: 'map'
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
        asyncDownloadScript('BMap', '//api.map.baidu.com/getscript?v=2.0&ak=8GrVRotzGKj3xzIRu07hCzx2')
        .then(mapInit.bind(this));
    }

    /**
     * 对地图初始化的操作处理
     */
    mapInit() {
        this.mapApi = new BMap.Map(this.state.mapid, {enableMapClick:false});
        const city = new BMap.LocalCity();
        city.get(result => {
            this.mapApi.centerAndZoom(result.name, 15);				
        });
    } 
}