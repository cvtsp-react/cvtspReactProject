const initialState = {
    userInfo: null,
    mapType: null
}

const mutations = {
    // 设置用户信息
    setUserMessage(state, params){
        console.log(params)
        localStorage.setItem('userInfo', JSON.stringify(params.userInfo));
        localStorage.setItem('token', params.token);
        localStorage.setItem('mapType', params.mapType);
        return {
            userInfo: params.userInfo,
            mapType: params.mapType,
            token: params.token
        }
    },
    // 刷新默认值
    defaultValue(state){
        return {
            token: localStorage.getItem('token'),
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            mapType: localStorage.getItem('mapType')
        };
    }
}

export default function(state=initialState, action){
    switch(action.type){
        case 'setUserInfo': return mutations.setUserMessage(state, action.payload);
        default: return mutations.defaultValue(state);
    }
}