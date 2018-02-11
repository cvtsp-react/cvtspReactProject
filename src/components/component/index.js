import React, {PropTypes} from 'react'
import {Detail, Http, Config} from '@/utils'

function classNames(){
	var classes = [];
	for(var i = 0,len=arguments.length; i<len; i++){
		var arg = arguments[i];
		if(!arg) continue;
		if(typeof arg === 'string' || typeof arg === 'number'){
			classes.push(arg);
		}else if(Array.isArray(arg)){
			classes.push(classNames.apply(null, arg))
		}else if(typeof arg === 'object'){
			for(var key in arg){
				if(arg.hasOwnProperty(key) && arg[key]){
					classes.push(arg[key]);
				}
			}
		}
	}
	return classes.join(' ');
}

export default class Component extends React.Component {
	constructor(props){
		super(props);
	}
	// 双向绑定
	model(key, e){
		let obj = {}, keys = key.split('.');
		(function loop(prevObj, i){				
			if(i >= keys.length-1){
				return prevObj[keys[i]] = e.target ? e.target.value : e;
			}else{
				let ls = prevObj[keys[i]] = {};
				i += 1;
				loop(ls, i);
			}
		})(obj, 0);
		this.setState(Detail.extend(true, this.state, obj));
		this.forceUpdate();
	}
	className(...args){
		return classNames.apply(this, args.concat([this.props.className]));
	}
	// 子类名的处理
	childClassName(...args){
		return classNames.apply(this, args);	
	}
	style(args){
		return Object.assign({}, args, this.props.style);
	}
	http(options={}, load){
		load && this.model(load, true);
		return new Promise((resolve, reject) => {
			Http(options).then(data => {
				load && this.model(load, false);
				resolve(data);
			}).catch(err => {
				load && this.model(load, false);
				reject(err);
			})
		})
	}
	config(){
		return Config;
	}
}

Component.propTypes = {
	style: PropTypes.object
}

