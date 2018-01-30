import React from 'react'
import {Component, Loading} from '@/components'

export default function (WrappedComponent) {
	return class LoadDecorator extends Component {
		constructor(props){
			super(props);
			this.state = {
				loading: props.loading || false
			}
		}
		componentWillReceiveProps(nextProps){
			if(nextProps.loading !== this.state.loading){
				this.setState({
					loading: nextProps.loading
				})
			}
		}
		render(){
			return (
				<Loading loading={this.state.loading}>
					<WrappedComponent  {...this.props} />
				</Loading>
			)
		}
	}
} 

