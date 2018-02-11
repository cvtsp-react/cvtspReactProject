import React from 'react';
import {Component} from 'components';
import moment from 'moment';
import {Form, Input, Button, Tabs, Table, DatePicker} from 'antd';
import '../style/less/fatigueDriving.less';

export default class FatigueDriving extends Component{

    constructor(props){
        super(props);
        this.state = {
            statisticData: {
                data: [],
                chooseTime: [],
                pagination: {total: '', current: ''}
            },
            detailData: {
                data: [],
                chooseTime: [],
                pagination: {total: '', current: ''}
            },
            key: 1,
            loading: true,
            chooseTime: []
        }
    }

    getData(type,page,vehicle,chooseTime){
        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const myMonth = this.toDB((myDate.getMonth()+1));
        
        const defaultStartDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + this.toDB(0) + ":" + this.toDB(0) + ":" + this.toDB(0);
        const defaultEndDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + 23 + ":" + 59 + ":" + 59;

        this.http({
            url: '/driver/fatigueStatistics',
            method: 'POST',
            params: {
                plateCode: vehicle ? vehicle : '',
                startDate: chooseTime && chooseTime.length ? chooseTime[0] : defaultStartDate,
                endDate: chooseTime && chooseTime.length ? chooseTime[1] : defaultEndDate,
                current: page,
                typeName: type
            }
        }).then(res => {
            if(res.flag){
                if(type === 1){
                    this.setState({
                        statisticData: {
                            data: res.data.records.map((item,index) => {
                                    return {
                                        key: index,
                                        vehicleNumber: item.plateCode,
                                        vehicleColor: item.plateColor,
                                        company: item.enterpriseName                            ,
                                        fleetName: item.fleetName,   
                                        fatigueCount: item.fatigueCount
                                    }
                                }),
                            chooseTime: [],
                            pagination: {
                                total: Math.ceil(res.data.total/10),
                                current: res.data.current
                            }
                        },
                        loading: false
                    });
                }else{
                    this.setState({
                        detailData: {
                            data: res.data.records.map((item,index) => {
                                    return {
                                        key: index,
                                        vehicleNumber: item.plateCode,
                                        vehicleColor: item.plateColor,
                                        company: item.enterpriseName                            ,
                                        fleetName: item.fleetName,   
                                        happendTime: item.happendTime
                                    }
                                }),
                            chooseTime: [],
                            pagination: {
                                total: Math.ceil(res.data.total/10),
                                current: res.data.current
                            }
                        },
                        loading: false
                    });
                }
                
            }
        })
    }

    componentDidMount(){
        this.getData(this.state.key,1);
    }

    disabledDate(current){
        return current && current > moment().endOf('day');
    }

    toDB(data){
        return data < 10 ? '0' + data : data;
    }

    changeTabel(key){
        if(Number(key) === 1){
            this.setState({
                loading: (!this.state.statisticData.data.length || !this.state.detailData.data.length) ? true : false,
                key: 1
            },() => {
                if(!this.state.statisticData.data.length || !this.state.detailData.data.length){
                    this.getData(this.state.key,1);
                }
            });
        }else{
            this.setState({
                loading: (!this.state.statisticData.data.length || !this.state.detailData.data.length) ? true : false,
                key: 0
            },() => {
                if(!this.state.statisticData.data.length || !this.state.detailData.data.length){
                    this.getData(this.state.key,1);
                } 
            });
        }
         
    }

    changePage(pagination){
        this.setState({
            loading: true
        });
        this.getData(this.state.key,pagination.current);
    }

    changeChooseTime(value,dateString){
        this.setState({
            chooseTime: dateString
        });
    }

    search(){
        const vehicle = this.refs.vehicleNumber.input.value;
        this.setState({
            loading: true
        });
        this.getData(this.state.key,1,vehicle,this.state.chooseTime);
    }
    
    render(){

        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const myMonth = this.toDB((myDate.getMonth()+1));
        
        const defaultStartDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + this.toDB(0) + ":" + this.toDB(0) + ":" + this.toDB(0);
        const defaultEndDate = myYear + "-" + myMonth + "-" + this.toDB(myDate.getDate()) + " " + 23 + ":" + 59 + ":" + 59;

        const TabPane = Tabs.TabPane;
        const {Column} = Table;
        const FormItem = Form.Item;
        const {RangePicker} = DatePicker;

        return(
            <div className={this.className('cv-fatigueDriving')}>
                <div>
                    <Form layout="inline">
                        <FormItem label="预警起止时间">
                            <RangePicker 
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={true}
                                disabledDate={this.disabledDate.bind(this)}
                                defaultValue={[moment(defaultStartDate), moment(defaultEndDate)]}
                                onChange={this.changeChooseTime.bind(this)}
                            />
                        </FormItem>
                        <FormItem label="车牌号码">
                            <Input ref="vehicleNumber"/>
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.search.bind(this)}>搜索</Button>
                        </FormItem>
                        <FormItem>
                            <Button>导出</Button>
                        </FormItem>
                    </Form>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.changeTabel.bind(this)}>
                        <TabPane tab="统计信息" key="1">
                            <Table 
                                bordered
                                loading={this.state.loading}
                                dataSource={this.state.statisticData.data}
                                pagination={this.state.statisticData.pagination}
                                onChange={this.changePage.bind(this)}
                                >
                                <Column title="车牌号码" dataIndex="vehicleNumber" key="vehicleNumber"/>
                                <Column title="车牌颜色" dataIndex="vehicleColor" key="vehicleColor"/>
                                <Column title="公司名称" dataIndex="company" key="company"/>
                                <Column title="分组名称" dataIndex="fleetName" key="fleetName"/>
                                <Column title="发生次数" dataIndex="fatigueCount" key="fatigueCount"/>
                            </Table>
                        </TabPane>
                        <TabPane tab="明细信息" key="2">
                            <Table 
                                bordered 
                                loading={this.state.loading}
                                dataSource={this.state.detailData.data} 
                                pagination={this.state.detailData.pagination}
                                onChange={this.changePage.bind(this)}
                                >
                                <Column title="车牌号码" dataIndex="vehicleNumber" key="vehicleNumber"/>
                                <Column title="车牌颜色" dataIndex="vehicleColor" key="vehicleColor"/>
                                <Column title="公司名称" dataIndex="company" key="company"/>
                                <Column title="分组名称" dataIndex="fleetName" key="fleetName"/>
                                <Column title="报警时间" dataIndex="happendTime" key="happendTime"/>
                            </Table>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}