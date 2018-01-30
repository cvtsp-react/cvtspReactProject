import React, {PropTypes} from 'react'
import {Component, FlyWeight} from 'components'
import {Tabs, Badge } from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './style/alarmNotice.less'

@withRouter
@connect(state => {return {login: state.login, monitor: state.monitor}})
export default class AlarmNotice extends Component {
    constructor(){
        super();
        this.socket = null;
        this.state = {
            urgentCount: 0,
            middleCount: 0,
            commonCount: 0,
            title: ''
        }
    }
    render(){
        const {urgentCount, middleCount, commonCount} = this.state;
        const count = urgentCount + middleCount + commonCount;
        return (
            <div className={this.className("monitor-alarm-notice", count == 0 && 'hidden')}>
                <Tabs size="small">
                    <Tabs.TabPane 
                        key="1"
                        forceRender
                        tab={<span>紧急报警 <Badge count={urgentCount}/></span>} >
                        <FlyWeight 
                            className="alarm-notice-table" ref="urgent"
                            onMouseOver={(val) => this.onMouseOver(val)}
                            onMouseOut={(val) => this.onMouseOut(val)}/>
                        </Tabs.TabPane>
                    <Tabs.TabPane 
                        key="2"
                        forceRender
                        tab={<span>中级报警 <Badge count={middleCount}/></span>} >
                        <FlyWeight className="alarm-notice-table" ref="middle" 
                        onMouseOver={(val) => this.onMouseOver(val)}
                        onMouseOut={(val) => this.onMouseOut(val)}/>
                        </Tabs.TabPane>
                    <Tabs.TabPane 
                        key="3"
                        forceRender
                        tab={<span>一般报警 <Badge count={commonCount}/></span>} >
                        <FlyWeight className="alarm-notice-table" ref="common" 
                        onMouseOver={(val) => this.onMouseOver(val)}
                        onMouseOut={(val) => this.onMouseOut(val)}/>
                        </Tabs.TabPane>
                </Tabs>
                
            </div>
        )
    }
    componentWillMount(){
        // 推送服务连接
        const {token} = this.props.login;
        token && this.alarmWebsocket();
    }
    componentWillUnmount(){
        // 关闭socket连接
        this.socket.disconnect();
    }
    /**
     * 报警推送程序入口
     */
    alarmWebsocket(){
        const {token, userInfo} = this.props.login;
        this.socket = io(this.config().socketUrl, {query: {
            token: token,
            userId: userInfo.id.toString()
        }});

        // socket连接开始
        this.socket.on('connect', _ => {console.log('socket连接成功!')});

        // socket 通信数据
        this.socket.on('t1', mess => {
            // 消息类型推送
            this.messageType(mess);
            // 报警级别推送
            this.alarmLevel(mess);
        })
    }
    /**
     * 报警类型分类 紧急；中级；一般
     * @param {*} mess 
     */
    alarmLevel(mess){
        switch(mess.alarmLevel){
            case '0': 
                this.setState({urgentCount: ++this.state.urgentCount});
                this.refs['urgent'].create(this._template(mess));
            break;
            case '1':
                this.setState({middleCount: ++this.state.middleCount});
                this.refs['middle'].create(this._template(mess));
            break;
            case '2':
                this.setState({commonCount: ++this.state.commonCount});
                this.refs['common'].create(this._template(mess));
            break;
        }
    }
    _template(mess){
        return `
            <span class="cv-col-6">${mess.plateCode}</span>
            <span class="cv-col-6">${mess.alarmTypeName}</span>
            <span class="cv-col-6">${mess.messageText}</span>
            <span class="cv-col-6">${mess.time}</span>
        `
    }
    onMouseOver(val){
        const {ref} = this.props.monitor.tooltip;
        
        ref.setTitle(val.innerText);
        ref.setPosition(val);
        ref.getVisibleChange(true);
    }
    onMouseOut(){     
        const {ref} = this.props.monitor.tooltip;
        ref.getVisibleChange(false);
    }
    /**
     * 消息类型推送: 指令；上下线；公司车组；关注；车辆状态
     * @param {*} mess 
     */
    messageType(mess){
        switch(mess.msgType){
            // 指令队列
            case 'W': return this._directiveQueue(mess);

            // 车辆上下线队列
            case 'O': return this._isOnlineQueue(mess);

            // 公司和车组修改队列
            case 'ENTERPRISE_FLEET_MSG': return this._enterpriseOrFleetQueue(mess);

            // 车辆修改队列
            case 'VehicleMsg': return this._vehicleQueue(mess);

            // 车辆关注队列
            case 'attentionMsg': return this._vehicleAttentionQueue(mess);
        }
    }
    _directiveQueue(){

    }
    _isOnlineQueue(){

    }
    _enterpriseOrFleetQueue(){

    }
    _vehicleQueue(){

    }
    _vehicleAttentionQueue(){

    }
}