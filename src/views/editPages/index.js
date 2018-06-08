import React, {PropTypes} from 'react'
import { Component } from '@/components'
import config from '@/utils/config'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown, notification, Modal, List, Switch, Form, Tabs } from 'antd'
import MainRouter from 'router/main'
import style from '@/viewstheme/editPages/index.less'
import { Number } from 'core-js/library/web/timers'

@connect(({ chat_store }) => { return {chat_store} })
@Form.create()
export default class EditPages extends Component {
    constructor(props) {
        super(props);

        this.socket = null;
        this.state = {
            routerList: [],
            user: {},
            modalFlag: false,
            socketmsg: true,
            weather: true
        }
    }

    async componentDidMount() {
        const menus = await this.http({ url: '/menus' });
        const user = await this.http({ method: 'get', url: '/user'});

        menus.flag && user.flag && this.setState({
            routerList: menus.data,
            user: user.data
        });

        this.props.dispatch({
            type: 'save_user',
            payload: user.data
        })
        this.websocketEnter();
    }

    menusRender() {
        return (
            <Menu>
                <Menu.Item onClick={() => this.setState({modalFlag: true})} >设置</Menu.Item>
                <Menu.Item onClick={() => this.handlerOutLogin()} >退出登陆</Menu.Item>
            </Menu>
        )
    }

    /**
     * websocket入口处
     */
    websocketEnter() {
        this.socket = io(config.socketUrl);
        this.socket.on('chat_serversend', mess => {
            // 存储当前的推送数据
            this.props.dispatch({
                type: 'chatMessage',       
                payload: mess
            });

            // 消息弹框推送
            this.state.socketmsg && notification.open({
                message: mess.name,
                description: (
                    <div dangerouslySetInnerHTML={{__html: mess.content}}></div>
                )
            })
        });

        this.props.dispatch({
            type: 'websocket',
            payload: this.socket
        });
    }

    /**
     * 退出登陆
     */
    async handlerOutLogin() {
        const { flag } = await this.http({url: '/login/outlogin' });
        if(flag) {
            window.location.href ='#';
            window.location.reload();
        }
    }

    /**
     * 系统设置弹框
     */
    handlerSetModal() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal 
                footer={null}
                visible={this.state.modalFlag} 
                onCancel={() => this.handlerCloseModal()}>
                    <Form layout="vertical">
                        <Form.Item label="推送消息">
                            {
                                getFieldDecorator('socketmsg', {
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })
                                (<Switch />)
                            }
                        </Form.Item>
                    </Form>
            </Modal>
        )
    }

    handlerCloseModal() {
        const { validateFields } = this.props.form;

        this.setState({modalFlag: false}, _ => {
            validateFields((err, values) => {
                this.setState(values);
            })
        });
    }

    render() {
        const menuLists = this.state.routerList.map((list, index) => {
            return (
                <Menu.Item key={index}>
                    <Link to={`/editPages/editComponents/${list.key}`}>
                        <Icon type="user" />
                        <span>{list.name}</span>
                    </Link>
                </Menu.Item>
            )
        });
        const { name, age, power } = this.state.user;
        const powerLists = (new Array(power).fill(1)).map((val, index) => {
            return ( <Icon type="qq" key={index} style={{color: '#ebbc1a'}} />)
        });
        return (
            <Layout className={this.className('main-layout')}>
                {/*  侧边栏 */}
                <Layout.Sider style={{overflowY:'auto'}}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.SubMenu key="components" title="组件文档">
                            {menuLists}
                        </Menu.SubMenu>
                        <Menu.SubMenu key="git" title="git说明">
                            <Menu.Item>
                                <Link to={'/editPages/gitRequestDoc/git'}>
                                    <Icon type="question-circle-o" />
                                    <span>git提交分支说明</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="chat" title="文档交流群">
                            <Menu.Item>
                                <Link to={'/editPages/chatRoom/facebook'}>
                                    <Icon type="question-circle-o" />
                                    <span>非诚勿扰</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Header className="main-layout__header">
                        <Dropdown overlay={this.menusRender()}>
                            <span>
                                <Avatar>USER</Avatar> 
                                {name}(当前等级: {powerLists})
                            </span>
                        </Dropdown> 
                    </Layout.Header>
                    <Layout.Content>
                        <MainRouter />
                    </Layout.Content>
                </Layout>
                {this.handlerSetModal()}
            </Layout>
        )
    }
}