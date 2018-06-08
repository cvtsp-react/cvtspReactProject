import React, {PropTypes} from 'react'
import {Component} from 'components'
import {Optimize, Browser, Detail} from 'utils'
import {functionDecorator} from 'decorators'
import defaultBarOptions from '../assets/defaultBarOptions'
import defaultLineOptions from '../assets/defaultLineOptions'
import defaultMapOptions from '../assets/defaultMapOptions'
import defaultPieOptions from '../assets/defaultPieOptions'

@functionDecorator
export default class Chart extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        data: PropTypes.object
    }
    constructor(){
        super();
        this.echart = null;
        
        this.throttle = Optimize.throttle(_ => {
            this.echart && this.echart.resize();
        });
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
    componentDidMount(){
        const {asyncDownloadScript} = this.props.publicMethods;
        asyncDownloadScript('echarts', 'http://lib.cvtsp.com/echarts/echarts.min.js').then( _  => {
            if(this.props.name == 'map'){
                echarts.registerMap('china', require('../assets/china').default);
            }
            // 图表初始化
            this.echart = echarts.init(this.refs['chart']);
            this._setOptions({});
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
            case 'line': return this.echart.setOption(Detail.extend({}, defaultLineOptions, data));
            case 'bar': return this.echart.setOption(Detail.extend({}, defaultBarOptions, data));
            case 'pie': return this.echart.setOption(Detail.extend({}, defaultPieOptions, data));
            case 'map': return this.echart.setOption(Detail.extend({}, defaultMapOptions, data));
        }
    }
}