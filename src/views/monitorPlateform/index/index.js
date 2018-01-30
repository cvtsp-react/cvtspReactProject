import React from 'react'
import {Component, GlobalTooltip} from 'components'
import {connect} from 'react-redux'
import {Layout, Tooltip} from 'antd'
import RouteMonitor from 'router/monitor'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Header from './header'
import AlarmNotice from './alarmNotice'
import './style/index.less'

@connect(state => {return {login: state.login, monitor: state.monitor}})
export default class MonitorApp extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const {title, visible} = this.props.monitor.tooltip;
        return (
            <div className="monitorContainer">
                <div className="bg"></div>
                <Header 
                    data={this.props.monitor.monitorMenus} />
                <Layout>
                    <Layout.Content className="monitorContent">
                        <RouteMonitor />
                    </Layout.Content>
                </Layout>
                <AlarmNotice className="monitorAlarm" />
                <GlobalTooltip ref="tooltip" title="hello"></GlobalTooltip>
            </div>
        )
    }
    componentWillMount(){
        // 菜单解析
        this.monitorMenus();
    }
    componentDidMount(){
        // 注册全局的tooltip
        this.props.dispatch({
            type: 'setTooltip',
            payload: {ref: this.refs['tooltip']}
        })
    }
    /**
     * 菜单请求处理
     */
    async monitorMenus(){
        const {data, flag} = await this.http({url: '/rolemenu/findMenuTree'});   
        flag && this.props.dispatch({type: 'getMonitorMenus', payload: data});
    }
    
}