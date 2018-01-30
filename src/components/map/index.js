import React from 'react'
import {Component} from '@/components'
import {Help} from '@/utils'

const defaultProps = {
	id: 'map'
}

/**
 * 基于高德地图二次开发的应用类
 */
export default class Map extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div id={this.props.id} style={this.style()} className={this.className()}></div>
		)
	}
	/**
	 * 地图对象初始化 
	 */
	componentDidMount(){
		const {id, onMapInit} = this.props;
		this.map = window.AMap && new AMap.Map(id, {
			zoom: 10
		});
		// 渲染需要时间（设置延迟）
		setTimeout( _ => { onMapInit && onMapInit() });	
	}
	/**
	 * 监听props变化进行实时画点
	 */
	componentWillReceiveProps(nextProps){
		const {point} = nextProps;
		if(!Help.isEmptyObject(point)){
			let marker = this.mapAddpoint({
				longitude: Number(point.mapLongitude),
				latitude: Number(point.mapLatitude)
			}, null);
			this.mapPanTo(marker.point);
		}
	}
	/**
	 * 获得地图的经纬度点对象(point)
	 */
	point(point){
		return new AMap.LngLat(
			Number(point.longitude || point.lng || 0), 
			Number(point.latitude || point.lat || 0)
		);
	}
	/**
	 * 获得地图的覆盖类(marker)
	 */
	mapAddpoint(points, ...args){
		var size, img, marker, point = this.point(points);
        if (args.length !== 0) {
            args[1] = undefined ? size = { width: 24, height: 24 } : size = args[1];
            marker = new AMap.Marker({
                map: this.map,
                position: point
            });
            marker.point = point;
            return marker;
        }
	}
	/**
	 * 
	 * @param {Object} overlay: 覆盖物（marker）添加到地图上显示
	 */
    addOverlay(overlay) {
        return overlay;
    }
    /**
     * 
     * @param {Object} point: 地图的经纬度点
     */
    mapPanTo(point) {
        this.map.panTo(point);
    }
}

Map.defaultProps = defaultProps;


