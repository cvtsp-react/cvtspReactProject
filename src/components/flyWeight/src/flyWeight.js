import React from 'react'
import {Component} from 'components'
import {Dom} from 'utils'

/**
 * 共享设计组件节约dom的创建
 */
export default class FlyWeight extends Component {
    static defaultProps = {
        max: 50,
        target: 'span'
    }
    constructor(props){
        super(props);
        this.toolPool = 0;
    }
    render(){
        return (
            <ul 
                className={this.className()} 
                onMouseOver={(event) => this.handlerEnter(event)}
                onMouseOut={(event) => this.handlerLeave(event)}
                ref="wrapper"></ul>
        )
    }
    componentDidMount(){
        this.element = this.refs['wrapper'];
    }
    create(content){
        const ele = this.element;
        // 对象池中的大小 < 最大值 否创建对象
        if(this.toolPool < this.props.max){
            let li = document.createElement('li');
            ele.appendChild(li);
            li.innerHTML = content;
            this.toolPool += 1;
        }else{
            let first = ele.firstChild;
            first.innerHTML = content;
            ele.appendChild(first);
        }
        ele.scrollTop = ele.scrollHeight - ele.offsetHeight;
    }
    handlerEnter(event){
        const _self = Dom.delegate(event, this.props.target);
        if(_self && this.props.onMouseOver){
            this.props.onMouseOver(_self);
        }
    }
    handlerLeave(event){
        const _self = Dom.delegate(event, this.props.target);
        if(_self && this.props.onMouseOut){
            this.props.onMouseOut(_self);
        }
    }
}