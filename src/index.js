import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import '@/assets/css/index.less'
import RouteApp from 'router'

const render = Component => {   
    ReactDOM.render(
        <Provider store={store}>
            <Component store={store} />
        </Provider>
        ,
        document.getElementById('root')
    );
};

render(RouteApp);


