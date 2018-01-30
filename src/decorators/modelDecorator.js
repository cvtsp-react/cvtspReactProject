import React from 'react'
import {Component} from '@/components'

export default (WrappedComponent) => {
	return class Hoc extends Component {
		constructor(props){
			super(props);
		}
		render(){
			const newProps = {
				reactModel: this.reactModel.bind(this),
				onChange: this.onChange.bind(this)
			}
			return (
				<WrappedComponent {...this.props} {...newProps} />
			)
		}
		onChange(value){
			
		}
	}
}
