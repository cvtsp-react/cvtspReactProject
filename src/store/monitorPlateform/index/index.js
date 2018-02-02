const initialState = {
    monitorMenus: [],
    monitorMenuLists: [],
    tooltip: {
        ref: null,
        title: '',
        visible: false
    }
}

const mutations = {
    getMonitorMenus(state, params){
        // 过滤监控平台的菜单
        const menus = params.find(val => val.id === 2);
        return {
            ...state,
            monitorMenus: menus.child
        }
    },
    // 动态设置气泡
    setTooltip(state, params){
        return {
            ...state,
            tooltip: Object.assign(state.tooltip, params)
        }
    }
}

export default function(state=initialState, action){
    switch(action.type){
        case 'getMonitorMenus': return mutations.getMonitorMenus(state, action.payload);
        case 'setTooltip': return mutations.setTooltip(state, action.payload);
        default: return initialState;
    }
}