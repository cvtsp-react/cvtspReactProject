import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Component} from 'components'
import '../style/globalTooltip.less'

export default class GlobalTooltip extends Component {
    static propTypes = {
        title: PropTypes.string,
        visible: PropTypes.bool
    }
    constructor(props){
        super(props);
        this.winSize = {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
        this.state = {
            title: '',
            visible: false,
            position: { x: 0, y: 0 }
        }
    }
    componentDidMount(){
        window.addEventListener('resize', this._windowChangeSize);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this._windowChangeSize);
    }
    _windowChangeSize(){
        this.winSize = {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.title,
            visible: nextProps.visible
        })
    }
    render(){
        return (
            <div className={this.className('cv-tooltip')} 
                style={this.style({
                    display: this.state.visible?'':'none',
                    transformOrigin: 'center bottom 0px',
                    position: 'absolute',
                    left: (this.state.position.x) + 'px',
                    top: (this.state.position.y) + 'px',
                    zIndex: 2
                })}>
                <div className="cv-tooltip-content" ref="content">
                    <div className="cv-tooltip-arrow"></div>
                    <div className="cv-tooltip-text">{this.state.title}</div>
                </div>
            </div>
        )
    }
    getVisibleChange(value){
        if(value === false){
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(_ => {
            this.setState({ visible: value });
        })
    }
    setTitle(value){
        this.setState({ title: value });
    }
    setPosition(dom){
        // 是dom节点
        if(dom && dom.nodeType == 1){
            let x = 0, y = 0, padding = 12;
            const rect = dom.getBoundingClientRect();
            // 横向
            const distanceX = rect.left + (rect.width+dom.scrollWidth)/2;
            if(distanceX > this.winSize.width){
                x = (rect.left+rect.width/2) - dom.scrollWidth/2 - (distanceX - this.winSize.width)-padding;
            }else{
                x = (rect.left+rect.width/2) - dom.scrollWidth/2 + padding; 
            }
            this.setState({
                position: {
                    x: x,
                    y: rect.top - 40,
                }
            }) 
        }
    }
}