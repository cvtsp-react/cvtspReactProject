import React, {PropTypes} from 'react'
import {Component} from 'components'
import {Progress} from 'antd'
import {Filter} from 'utils'
import './style/vehicleCount.less'

export default class VehicleCount extends Component {
    static propTypes = {
        data: PropTypes.object,
        defaultProps: PropTypes.object
    }
    static defaultProps = {
        // 对应的默认key值
        defaultProps: {
            offlineCount: 'offlineCount',
            onlineCount: 'onlineCount',
            totalCount: 'totalCount'
        }
    }
    constructor(props){
        super(props);
    }
    render(){
        const {data, defaultProps} = this.props;
        return (
            <ul className={this.className('monitor-home-count')}>
                <li className="monitor-home-item">
                    <div className="border-radius border-radius-primary">
                        <div>入网车辆</div>
                        {Filter(data[defaultProps.totalCount],'defaultValue')}
                    </div>
                </li>
                <li className="monitor-home-item">
                    <div className="border-radius border-radius-success">
                        <div>在线车辆</div>
                        {Filter(data[defaultProps.onlineCount],'defaultValue')}
                    </div>
                </li>
                <li className="monitor-home-item">
                    <div className="border-radius border-radius-danger">
                        <div>离线超时</div>
                        {Filter(data[defaultProps.offlineCount],'defaultValue')}
                    </div>
                </li>
                <li className="monitor-home-item">
                    <div className="border-radius border-radius-light">
                        <div>在线率</div>
                        {Filter(
                            data[defaultProps.onlineCount]/data[defaultProps.totalCount],
                            'toPercent|defaultValue'
                        )}
                    </div>
                </li>
            </ul>
        )
    }
}