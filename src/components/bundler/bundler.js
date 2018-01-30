import React from 'react'
import {Component} from 'components'

export default class Bundler extends Component {
    constructor(props){
        super(props);
        this.state = {
            mod: null
        }
    }
    render(){
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
    componentWillMount(){
        this.load(this.props);
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }
    load(props){
        this.setState({
            mod: null
        })
        props.load(mod => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }
}