import React from 'react'
import {Component} from 'components'

export default class DialogCenter extends Component {
    render(){
        return (
            <div>{this.props.content}</div>
        )
    }
}