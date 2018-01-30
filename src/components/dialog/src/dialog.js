import React from 'react'
import ReactDOM from 'react-dom'
import DialogCenter from './dialogCenter'

export default function Dialog(props = {}){
    const div = document.createElement('div');
    document.body.appendChild(div);
    
    function render(props){
        const element = React.createElement(DialogCenter, {...props});
        ReactDOM.render(element, div);
    }
    return {
        render: render
    }
}