import React, {PropTypes} from 'react'
import {Component} from '@/components'
import {connect} from 'react-redux'
import LoginFrame from './loginFrame'
import style from '@/viewstheme/login/index.less'

@connect(state => {return Object.assign({},state.login)})
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    }
    render(){
        return (
            <div className={this.className('login-bg')}>
                <LoginFrame 
                    loading={this.state.loading}
                    className='login-frame'
                    onSubmit={this.handlerSubmit.bind(this)} />
            </div>
        )
    }
    // 登录框提交
    async handlerSubmit(values){
        const {data, flag} = await this.http({url: '/login', params: values}, 'loading');
        if(flag){
            this.props.dispatch({type: 'setUserInfo', payload: data});
            this.props.history.push('/m');
        }
    }
}
