import React from 'react'
import {Component} from 'components'

export default class DynamicComponent extends Component {
    static defaultProps = {
        is: null
    }
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(this.props.is, {
            ...this.props
        })
    }
}