import React from 'react';
import {Component} from 'components';
import moment from 'moment';
import {Form, Input, Button, Table, DatePicker} from 'antd';

import '../style/less/vehicleupdownlog.less';


export default class VehicleupdownLog extends Component {

    constructor(props){
        super(props);
        this.state = {
            vehicleupdownlogData: {},
            data: [],
            pagination: {
                total: '',
                current: ''
            },
            onlineTime: [],
            offTime: []
        }
    }

    toDB(data){
        return data < 10 ? '0' + data : data;
    }

    getData(page,vehicle,terminal,onlineTime,offlineTime){
        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const myMonth = this.toDB((myDate.getMonth()+1));
        
        const defaultStartDate = myYear + "-" + myMonth + "-" + this.toDB((myDate.getDate()-1)) + " " + this.toDB(0) + ":" + this.toDB(0) + ":" + this.toDB(0);
        const defaultEndDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + 23 + ":" + 59 + ":" + 59;

        this.http({
            url: '/log/getVehicleOnlineLogPage',
            method: 'POST',
            params: {
                plateCode: vehicle ? vehicle : '',
                terminalCode: terminal ? terminal : '',
                startOnlineTime: onlineTime ? onlineTime[0] : defaultStartDate,
                endOlineTime: onlineTime ? onlineTime[1] : defaultEndDate,
                startOffTime: offlineTime ? offlineTime[0] :defaultStartDate,
                endOffTime: offlineTime ? offlineTime[1] :defaultEndDate,
                current: page
            }
        }).then(res => {
            if(res.flag){
                this.setState({
                    vehicleupdownlogData: res.data,
                    data: res.data.records.map((item,index) => {
                        return {
                            key: index,
                            vehicleNumber: item.plateCode,
                            vehicleColor: item.plateColor,
                            terminalNumber: item.terminalCode,
                            onlineTime: item.onlineTimeStr,
                            offlineTime: item.offTimeStr,    
                            offlineType: item.reasonTypeName
                        }
                    }),
                    pagination: {
                        total: Math.ceil(res.data.total/10),
                        current: res.data.current
                    }
                });
            }
        })
    }

    componentDidMount(){
        this.getData(1);
    }

    changePage(pagination){
        this.getData(pagination.current);
    }

    showTable(){
        const { Column} = Table;
        return(
            <Table 
                bordered 
                loading={this.state.data.length ? false : true}
                dataSource={this.state.data} 
                pagination={this.state.pagination}
                onChange={this.changePage.bind(this)}
                >
                <Column title="车牌号码" dataIndex="vehicleNumber" key="vehicleNumber"/>
                <Column title="车牌颜色" dataIndex="vehicleColor" key="vehicleColor"/>
                <Column title="终端编号" dataIndex="terminalNumber" key="terminalNumber"/>
                <Column title="上线时间" dataIndex="onlineTime" key="onlineTime"/>
                <Column title="下线时间" dataIndex="offlineTime" key="offlineTime"/>
                <Column title="下线类型" dataIndex="offlineType" key="offlineType"/>
            </Table>
        )
    }

    search(){
        // console.log(this.state.chooseTime)
        const vehicle = this.refs.vehicleNumber.input.value;
        const terminal = this.refs.terminalNumber.input.value;
        this.getData(1,vehicle,terminal,this.state.onlineTime,this.state.offTime);

    }

    disabledDate(current){
        return current && current > moment().endOf('day');
    }

    changeOnlineTime(value,dateString){
        // console.log(dateString)
        this.setState({
            onlineTime: dateString
        });
    }

    changeOffTime(value,dateString){
        this.setState({
            offTime: dateString
        });
    }

    render() {
        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const myMonth = this.toDB((myDate.getMonth()+1));
        
        const defaultStartDate = myYear + "-" + myMonth + "-" + this.toDB((myDate.getDate()-1)) + " " + this.toDB(0) + ":" + this.toDB(0) + ":" + this.toDB(0);
        const defaultEndDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + 23 + ":" + 59 + ":" + 59;
        // console.log(this.state.vehicleupdownlogData,this.state.data)
        const FormItem = Form.Item;
        const {RangePicker} = DatePicker;

        return (
<<<<<<< HEAD
            <div className={this.className('cv-vehicleupdownlog')}>
                <div className="header">
                    <Form layout="inline">
                        <FormItem label="车辆号码：">
                            <Input placeholder="车牌号" ref="vehicleNumber" />
                        </FormItem>
                        <FormItem label="终端编号：">
                            <Input placeholder="终端编号：" ref="terminalNumber"/>
                        </FormItem>
                        <FormItem label="上线时间">
                            <RangePicker 
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={true}
                                disabledDate={this.disabledDate.bind(this)}
                                defaultValue={[moment(defaultStartDate), moment(defaultEndDate)]}
                                onChange={this.changeOnlineTime.bind(this)}
                            />
                        </FormItem>
                        <FormItem label="下线时间">
                            <RangePicker 
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={true}
                                disabledDate={this.disabledDate.bind(this)}
                                defaultValue={[moment(defaultStartDate), moment(defaultEndDate)]}
                                onChange={this.changeOffTime.bind(this)}
                            />
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.search.bind(this)}>搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button>导出</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className="dataTable">
                    {this.showTable()}
                </div>
=======
            <div style={this.style()} className={this.className()}>
                <h2 className=""></h2>
>>>>>>> 1f162b840199cc00f4317ecaba145b8436a49503
            </div>
        )
    }
}

