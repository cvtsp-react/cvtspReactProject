import React, {PropTypes} from 'react'
import {Component} from 'components'
import {Help} from 'utils'
import defaultBarOptions from '../assets/defaultBarOptions'
import defaultLineOptions from '../assets/defaultLineOptions'
import defaultMapOptions from '../assets/defaultMapOptions'
import defaultPieOptions from '../assets/defaultPieOptions'

export default class Chart extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        data: PropTypes.object
    }
    constructor(){
        super();
        this.echart = null;
    }
    componentWillReceiveProps(nextProps){
        if(this.echart){
            this._setOptions(nextProps.data);
        }
    }
    render(){
        return (
            <div ref="chart" className={this.className()} style={this.style()}></div>
        )
    }
    componentWillMount(){
        this.throttle = Help.throttle(_ => {
            this.echart && this.echart.resize();
        });
    }
    componentDidMount(){
        this._asyncLoadEchart().then( _  => {
            if(this.props.name == 'map'){
                echarts.registerMap('china', require('../assets/china').default);
            }
            // 图表初始化
            this.echart = echarts.init(this.refs['chart']);
            this._setOptions();
            window.addEventListener('resize', this.throttle);   
        })    
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.throttle);
    }
    getEchart(){
        return this.echart;
    }
    _setOptions(data){
        this.echart.clear();
        switch(this.props.name){
            case 'line': return this.echart.setOption(Help.extend({}, defaultLineOptions, data));
            case 'bar': return this.echart.setOption(Help.extend({}, defaultBarOptions, data));
            case 'pie': return this.echart.setOption(Help.extend({}, defaultPieOptions, data));
            case 'map': return this.echart.setOption(Help.extend({}, defaultMapOptions, data));
        }
    }
    /**
     * 资源很大，采用cdn方式加载文件
     */
    _asyncLoadEchart(){
        if(!global.echarts){
            global.echarts = {};
            global.echarts._preload = new Promise((resolve, reject) => {
                const $script = document.createElement('script');
                $script.src = 'http://lib.cvtsp.com/echarts/echarts.min.js';
                global.document.body.appendChild($script);
                if(Help.browser.IS_IE){
                    $script.onreadystatechange = () => {
                        if($script.readyState === 'loaded' || $script.readyState === 'complete'){
                            resolve(global.echarts);
                            global.echarts._preload = null;
                        }
                    }
                }else{
                    $script.onload = () => {
                        resolve(global.echarts);
                        global.echarts._preload = null;
                    }
                }
            });
            return global.echarts._preload;
        }else if(!global.echarts._preload){
            return Promise.resolve(global.echarts);
        }else{
            return global.echarts._preloader;
        }
    }
}