import React from 'react'
import {Component} from '@/components'
import { Table, Button, Icon, Select, Form, Input, Modal } from 'antd'

@Form.create()
export default class PropsTab extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            { title: '说明', dataIndex: 'instructor'},
            { title: '代码', dataIndex: 'code', width: '50%'},
            { title: '操作', render: (text, record, index) => {
                return (
                    <Button.Group size="small">
                        <Button type="primary" 
                        onClick={() => this.handlerModify(text, record, index)}>修改</Button>
                        <Button type="danger"
                        onClick={()=> this.handlerRemove(text, record, index)}>删除</Button>
                    </Button.Group>
                )
            }}
        ];
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

    /**
     * 表格修改的点击事件
     * @param {*} text 
     */
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
        let currentData = [...this.state.data];
        currentData.splice(index, 1);

        this.setState({ data: currentData}, _ => {
            this.props.onChange(this.state.data);
        })
    }

    render() {
        return (
            <div>
                <Button type="dashed" style={{marginBottom: 10}} onClick={() => this.addRowEdit()}>
                    <Icon type="plus" />添加
                </Button>
                <Table columns={this.columns} dataSource={this.state.data} />

                {/* model */}
                <Modal 
                    visible={this.state.isModal} 
                    onOk={this.handlerSubmit.bind(this)}
                    onCancel={() => this.setState({isModal: false})}>
                    {this.rowAddModal()}
                </Modal>
            </div>
        )
    }

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
                        this.setState({ data: currentData, isModal: false }, _ => {
                            this.props.onChange(this.state.data);
                        });      
                    break;
                    case 'modify':
                        currentData = [...this.state.data];
                        currentData.splice(this.state.index, 1, values);
                    break;
                };
                this.setState({ data: currentData, isModal: false}, _ => {
                    this.props.onChange(this.state.data);
                })
            }
        })
    }

    addRowEdit() {
        this.setState({
            isModal: true,
            currentKey: 'add'
        }) 
    }

    rowAddModal() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <Form.Item label="说明:">
                    {
                        getFieldDecorator('instructor', {
                            rules: [{ required: true }]
                        })
                        (<Input />)
                    }
                </Form.Item>
                <Form.Item label="代码:">
                    {
                        getFieldDecorator('code', {
                            rules: [{ required: true }]
                        })
                        (<Input.TextArea rows={8} />)
                    }
                </Form.Item>
            </Form>
        )
    }
}