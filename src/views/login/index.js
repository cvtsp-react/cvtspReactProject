import React, {PropTypes} from 'react'
import {Component} from '@/components'
import {connect} from 'react-redux'
import LoginFrame from './loginFrame'
import {setUserInfo} from '../../actions';
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

    async handlerSubmit(values,tips){
        const { flag, data } = await this.http({ url: '/login', params: values });
        
        if(flag) {
            localStorage.setItem('token', data);
            this.props.history.push('/main');
        }else {
            tips.innerHTML = '账号或密码不存在';
        }
    }
}
