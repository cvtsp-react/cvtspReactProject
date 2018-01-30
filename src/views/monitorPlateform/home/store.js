const initialState = {
    //在线车辆和离线车辆统计
    findVehicleOnlineCountApi: '/index/findVehicleOnlineCount',
    //获取地图各省份车辆数
    getMapVehcileCountApi: '/index/getMapVehcileCount'

}

const mutations = {

}

export default function(state=initialState, action){
    switch(action.type){
        default: return initialState;
    }
}