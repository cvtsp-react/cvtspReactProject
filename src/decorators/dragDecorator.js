import React from 'react'
import ReactDom from 'react-dom'
import { Component} from '@/components'

export default function(WrappedComponent) {
    return class Hop extends Component {
        constructor(props) {
            super(props);

            // 当前的距离
            this.CURRENT_DISTANCE = {
                x: 0,
                y: 0
            };
            this.dragTarget = null;
        } 

        componentDidMount() {
            this.dragTarget = ReactDom.findDOMNode(this);
            this.dragTarget.onmousedown = (e) => {
                if(window.event) e = window.event;
                
                this.CURRENT_DISTANCE = {
                    x: e.pageX - this.dragTarget.offsetLeft,
                    y: e.pageY - this.dragTarget.offsetTop
                };
                
                document.onmousemove = (e) => this.handlerMouseMove(e);
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            } 
        }

        handlerMouseMove(e) {
            const current_pos = {
                x: e.pageX,
                y: e.pageY
            }
            const distanceX = current_pos.x - this.CURRENT_DISTANCE.x;
            const distanceY = current_pos.y - this.CURRENT_DISTANCE.y;
            this.dragTarget.style.left = distanceX + 'px';
            this.dragTarget.style.top = distanceY + 'px';
        }

        render() {
            return (
                <WrappedComponent {...this.props} ref=""></WrappedComponent>
            )
        }
    }
}