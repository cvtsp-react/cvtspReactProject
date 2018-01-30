import React, {PropTypes} from 'react'
import {Component, Icons, Dialog} from '@/components'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Dropdown, Select, Popover} from 'antd'
import Menus from './menu'
import styles from './style/header.less'

@withRouter
export default class Header extends Component {
    static propTypes = {
        data: PropTypes.array  
    }
    constructor(props){
        super(props);
        this.dialog = new Dialog();
        this.state = {
            data: [],
            options: null
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            options: this._menusRecursion(nextProps.data)
        })
    }
    render(){
        // 快速搜索菜单
        const menuLists = React.createElement(Menus, {data: this.state.options});
        // 下拉列表
        const dropdownItem = (
            <Menu onClick={this.dropHandler.bind(this)}>
                <Menu.Item key="setting">设置</Menu.Item>
                <Menu.Item key="lookup">查岗应答</Menu.Item>
            </Menu>
        );
        return (
            <div className={this.className('cv-header')}>
                <Popover placement="topLeft" title="菜单搜索" content={menuLists} trigger="click">
                    <Icons name="gengduo" color="#fff" style={{paddingLeft: 10}} />
                </Popover>
                <Dropdown overlay={dropdownItem}>
                    <a className='cv-dropdown'>用户名</a>
                </Dropdown>
            </div>
        )
    }
    dropHandler(e){
        switch(e.key){
            case 'setting':
               this.dialog.render({
                   title: 'ok',
                   content: (
                       <div>hello</div>
                   )
               });
            break;
            case 'lookup':
                this.dialog.render();
            break;
        }
    }
    /**
     * 
     * @param {*} menus: 递归的数组对象
     * @param {*} key : 对某个键值进行递归(默认值：child)
     */
    _menusRecursion(menus, key="child"){
        let menuLists = [];
        // 递归数组
        const recursion = (lists) => {
            if(Array.isArray(lists) && lists.length > 0){
                lists.forEach(list => {
                    list.url !== "" && menuLists.push(list);
                    recursion(list[key]);
                })
            }
        };
        recursion(menus);
        return menuLists;
    }
}