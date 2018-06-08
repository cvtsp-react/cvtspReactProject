import React, {PropTypes} from 'react'
import {Component} from 'components'

export default class DynamicComponent extends Component {
    static defaultProps = {
        // 组件类名
        is: null
    }
    static propTypes = {
        is: PropTypes.func
    }
    render() {
        return this.props.is 
        ? React.createElement(this.props.is, {
            ...this.props
        })
        : React.createElement('div')
    }
}