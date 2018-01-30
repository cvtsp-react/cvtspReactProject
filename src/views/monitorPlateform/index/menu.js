import React from 'react'
import {Input} from 'antd'
import {Link} from 'react-router-dom'
import {Component} from 'components'
import {Help} from 'utils'
import './style/menu.less'

export default class Menus extends Component {
    constructor(props){
        super(props);
        this.alldata = props.data;
        this.state = {
            data: this.alldata,
            value: ''
        }
    }
    render(){
        const child = this.state.data.map((val, index) => {
            return (
                <Link 
                    className="menuLists-item"
                    to={val.url} 
                    key={val.title}>
                    {val.title}
                </Link>
            )
        })
        return (
            <div className="menuMini">
                <Input size="small" onChange={this.changeHandler.bind(this)}/>
                <ul className="menuLists">{child}</ul>
            </div>
        )
    }
    componentWillMount(){
        this.throttle = Help.throttle(_ => {
            this.filterMenuList();
        }, 1000)
    }
    /**
     * input 变化事件
     * @param {*} event 
     */
    changeHandler(event){
        this.setState({value: event.target.value});
        this.throttle();
    }
    filterMenuList(){
        const data = this.alldata.filter(val => {
            return (val.title).indexOf(this.state.value) >= 0;
        });
        this.setState({ data })
    }
}