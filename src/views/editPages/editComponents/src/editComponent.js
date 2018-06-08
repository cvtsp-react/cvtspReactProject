import React from 'react'
import { Component } from '@/components'
import EditComponentDoctab from './editComponent-doctab'
import EditComponentsPropstab from './editComponent-propstab'
import EditComponentsMethodstab from './editComponent-methodstab'
import { Form, Input, Card, Button, Icon, Table, Tabs, Select, message } from 'antd'

@Form.create()
export default class EditComponents extends Component {
    constructor(props) {
        super(props);
        this.current_router = this.props.match.params.children;
        this.SCHEMA = {
            title: '',
            router: this.current_router,
            keys: [],
            names: [],
            props: [],
            events: [],
            methods: []
        };
        this.state = {
            current_router: this.current_router
        }
    }

    componentWillReceiveProps(nextProps) {
        const newRouter = nextProps.match.params.children;
        const oldRouter = this.props.match.params.children;

        if(newRouter !== oldRouter) {
            this.setState({
                current_router: newRouter
            }, _ => {
                this.getRouterQuest();  
            })
        }
    }

    componentDidMount() {
        this.getRouterQuest();  
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        // 动态添加组件案例文档
        getFieldDecorator('keys', { initialValue: [] });
        getFieldDecorator('router', {initialValue: this.state.current_router});
        return (
            <Form onSubmit={this.handlerSubmit.bind(this)}>
                <Form.Item {...formItemLayout} label="标题:">
                    {
                        getFieldDecorator('title', {
                            rules: [
                                {required: true, message: '请输入标题'}
                            ]
                        })
                        (<Input placeholder="标题" />)
                    }
                </Form.Item>
                
                <Form.Item {...formItemLayout} label="关键字">
                    {
                        getFieldDecorator('router', {
                            rules: [{required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
                    
                {/* 动态添加代码说明 */}
               <Form.Item {...formItemLayout} label="组件案例">
                    {
                        getFieldDecorator('names', {})
                        (<EditComponentDoctab />)
                    }
                </Form.Item>
                
                {/* 动态添加api说明 */}
                <Form.Item {...formItemLayout} label="添加api说明:">
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="添加属性" key="1" forceRender={true}>
                            <Form.Item>
                                {
                                    getFieldDecorator('props', {})
                                    ( <EditComponentsPropstab /> )
                                }
                            </Form.Item>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="添加事件" key="2" forceRender={true}>
                            <Form.Item>
                                {
                                    getFieldDecorator('events', {})
                                    ( <EditComponentsMethodstab /> )
                                }
                            </Form.Item>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="添加方法" key="3" forceRender={true}>
                            <Form.Item>
                                {
                                    getFieldDecorator('methods', {})
                                    ( <EditComponentsMethodstab /> )
                                }
                            </Form.Item>
                        </Tabs.TabPane>
                    </Tabs>
                </Form.Item>

                {/* 提交 */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        )
    }

    /**
     * 根据路由查询当前页面数据渲染数据
     */
    async getRouterQuest() {
        const { setFieldsValue, resetFields } = this.props.form;

        resetFields();
        const { flag, data } = await this.http({
            url: '/saveComponents/find', 
            params: {router: this.state.current_router} 
        });

        if(flag && data) {
            setFieldsValue(data);
        }else {
            setFieldsValue(this.SCHEMA)
        }
    }

    /**
     * 动态添加组件案例
     */
    addComponentDocs() {
        const { getFieldValue, setFieldsValue } = this.props.form;
        const keys = getFieldValue('keys');
        const nextKeys = keys.concat(new Date().getTime());

        setFieldsValue({
            keys: nextKeys
        })
    }

    /**
     * 动态删除组件事件
     * @param {Number} k: 当前的key值 
     */
    removeComponentDocs(k) {
        const { getFieldValue, setFieldsValue } = this.props.form;
        let keys = getFieldValue('keys');

        if(keys.length === 0) return;
        keys.splice(keys.findIndex(key => key == k), 1);

        setFieldsValue({
            keys
        });
    }

    /**
     * 提交事件
     */
    handlerSubmit() {
        const { validateFields } = this.props.form;
        let SCHEMA = Object.assign({}, this.SCHEMA);

        validateFields((err, values) => {
            if(!err) {
                const keys = Object.keys(SCHEMA);
                keys.forEach(key => {
                    values[key] && (SCHEMA[key] = values[key]);
                });
                
                this.http({
                    url: '/saveComponents',
                    data: JSON.stringify(SCHEMA)
                }).then( mess => {
                    const { flag, msg } = mess;
                    flag ? message.success(msg) : message.error(msg);
                })
            }
        })
    }
}