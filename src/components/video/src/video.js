import React from 'react'
import {Component} from 'components'
import video from '../assets/video.source'
import '../assets/video.source.css'

export default class Video extends Component {
    constructor(){
        super();
        // 播放器实例对象
        this.player = null;

    }
    render(){
        return (
            <div>
                <video ref="video" controls className="video-js" width="400" height="200">
                    <source src='rtmp://live.hkstv.hk.lxdns.com/live/hks' type="rtmp/flv"  />  
                </video>
            </div>
        )
    }
    componentDidMount(){
        this.player = video(this.refs['video']);
        
        
    }
}