import React from 'react'
import { Component } from '@/components'

export default class ChatRoomDraw extends Component {
    constructor(props) {
        super(props);
        this.canvas = null;
    }

    componentDidMount() {
        this.canvas = this.refs['canvas'].getContext('2d');
        this.drapLine();
    }

    render() {
        return (
            <div className="chatroom-draw">
                <canvas ref="canvas" width="400" height="200" />
            </div>
        )
    }
    
    drapLine() {
        this.canvas.beginPath();
        this.canvas.moveTo(0, 0);
        this.canvas.lineTo(100, 100);
        this.canvas.stroke();
    }
}