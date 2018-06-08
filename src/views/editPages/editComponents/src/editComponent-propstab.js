import React from 'react'
import {Component} from '@/components'
import { Table, Button, Icon, Select, Form, Input, Modal } from 'antd'


@Form.create()
export default class PropsTab extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '参数', dataIndex: 'arguments', width: '15%'},
            { title: '说明', dataIndex: 'instructor', width: '25%'},
            { title: '类型', dataIndex: 'type', width: '25%'},
            { title: '可选值', dataIndex: 'choose', width: '15%'},
            { title: '默认值', dataIndex: 'default'},
            { title: '操作', render: (text, record, index) => {
                return (
                    <Button.Group size="small">
                        <Button type="primary" onClick={() => this.handlerModify(text, record, index)}>修改</Button>
                        <Button type="danger" onClick={() => this.handlerRemove(text, record, index)}>删除</Button>
                    </Button.Group>
                )
            }}
        ];
        this.uid = 0;
        this.state = {
            data: [],
            editingKey: '',
            isModal: false,
            currentKey: 'add',
            index: 0
        }
    }

    /**
     * 如何保证只触发一次(实际，每次setState都会触发)
     * @param {*} nextProps 
     */
    componentWillReceiveProps(nextProps) {
        const { value, match } = nextProps;
        if(!(this.props.value && value && this.props.value.length == value.length)) {
            this.setState({ data: value }) 
        }
    }

    handlerModify(text, record, index) {
        const { setFieldsValue } = this.props.form;
        
        this.setState({
            isModal: true,
            currentKey: 'modify',
            index
        });
        setFieldsValue(text);
    }

    handlerRemove(text, record, index) {
        const currentData = [...this.state.data];
        
        currentData.splice(index, 1);
        this.setState({ data: currentData }, _ => {
            this.props.onChange(this.state.data);
        });  
    }

    render() {
        const { data, currentKey } = this.state;

        return (
            <div>
                <Button type="dashed" style={{marginBottom: 10}} onClick={() => this.addRowEdit()}>
                    <Icon type="plus" />添加
                </Button>
                <Table pagination={false} columns={this.columns} dataSource={data} />

                {/* model */}
                <Modal 
                    visible={this.state.isModal} 
                    onOk={this.handlerSubmit.bind(this)}
                    onCancel={() => this.setState({isModal: false})}>
                    {this.rowEditModal()}
                </Modal>
            </div>
        )
    }

    /**
     * 添加新数据的提交事件
     */
    handlerSubmit() {
        const { validateFields } = this.props.form;

        validateFields((err, values) => {
            let currentData = [];
            if(!err) {
                switch(this.state.currentKey) {
                    case 'add':
                        currentData = [...this.state.data];
                        currentData.push({
                            key: new Date().getTime(),
                            ...values
                        });
                    break;  
                    case 'modify':
                        currentData = [...this.state.data];
                        currentData.splice(this.state.index, 1, values);
                    break;
                }  
                this.setState({ data: currentData, isModal: false }, _ => {
                    this.props.onChange(this.state.data);
                });      
            }
        })
    }

    addRowEdit() {
        this.setState({ isModal: true, currentKey: 'add' });
    }

    rowEditModal() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <Form.Item label="参数:">
                    {
                        getFieldDecorator('arguments', {
                            rules: [{ required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
                <Form.Item label="说明:">
                    {
                        getFieldDecorator('instructor', {
                            rules: [{ required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
                <Form.Item label="类型:">
                    {
                        getFieldDecorator('type', {
                            rules: [{ required: true }]
                        })
                        (
                            <Select>
                                <Select.Option value="null">Null</Select.Option>
                                <Select.Option value="undefined">Undefined</Select.Option>
                                <Select.Option value="number">Number</Select.Option>
                                <Select.Option value="boolean">Boolean</Select.Option>
                                <Select.Option value="string">String</Select.Option>
                                <Select.Option value="array">Array</Select.Option>
                                <Select.Option value="object">Object</Select.Option>
                                <Select.Option value="function">Function</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="可选值:">
                    {
                        getFieldDecorator('choose', {
                            rules: [{ required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
                <Form.Item label="默认值:">
                    {
                        getFieldDecorator('default', {
                            rules: [{ required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
            </Form>
        )
    }
}