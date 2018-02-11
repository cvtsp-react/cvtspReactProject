import axios from 'axios'
import querystring from 'querystring'

/**
 * 登录框提交
 */
export const setUserInfo = (values) => {
    return dispatch => {
        return axios.post('http://test.cvtsp.com/api/login',querystring.stringify(values)).then(res => {
            // console.log(res)
            if(res.data.flag){
                dispatch({
                    type: 'setUserInfo',
                    payload: res.data.data
                });
            }
            return Promise.resolve(res.data);
        });
    }
}

export const getMonitorMenus = () => {
    return dispatch => {
        axios({
            url: 'http://test.cvtsp.com/api/rolemenu/findMenuTree',
            method: 'post',
            headers: {'token': localStorage.getItem('token')}
        }).then(res => {
            // console.log(res)
            if(res.data.flag){
                dispatch({
                    type: 'getMonitorMenus',
                    payload: res.data.data
                });
            }
        });
    }
}