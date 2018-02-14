import React from 'react'
import {Select} from 'antd'
import {Component, Map, DynamicComponent} from 'components'
import '../style/multi-monitor.less'

export default class MultiMonitor extends Component {
    constructor() {
        super();
        this.state = {
            map: Map.Baidu
        }
    }

    render() {
        return (
            <div className="multi-monitor">
                <Select defaultValue="0" onChange={this.onChange.bind(this)}>
                    <Select.Option value="0">百度</Select.Option>
                    <Select.Option value="1">高德</Select.Option>
                </Select>
                <DynamicComponent className="monitor-map" is={this.state.map} />
            </div>
        )
    }
    onChange(value) {
        switch(Number(value)) {
            case 0: return this.setState({map: Map.Baidu});
            case 1: return this.setState({map: Map.Gaode});
        }
    }
}
