import React from 'react'
import {Component} from '@/components'
import styles from './icon.less'

const defaultProps = {
	defaultName: 'el-icon-tsp-',
	name: 'circle',
	size: 20,
	color: ''
};
export default class Icons extends Component {
	constructor(props){
		super(props);
		this.state = {
			type: props.type || 'default'
		}
	}
	componentWillReceiceProps(nextProps){
		if(nextProps.type !== this.props.type){
			this.setState({
				type: nextProps.type
			})
		}
	}
	render(){
		const { defaultName, name, size, color } = this.props;
		return (
			<i 
			onClick={this.onClick.bind(this)}
			className={this.className(defaultName + name, styles['icon-'+this.state.type])}
			style={this.style({'fontSize': size+'px', 'color': color, cursor: 'pointer'})}></i>
		)
	}
	onClick(e){
		if(this.props.onClick){
			this.props.onClick(e);
		}
	}
}

Icons.defaultProps = defaultProps;