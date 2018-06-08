import React from 'react'
import { Component } from 'components'
import { connect } from 'react-redux'
import { Button } from 'antd'
import ChatRoomDraw from './chatRoomDraw'
import { dragDecorator } from 'decorators'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import style from '@/viewstheme/editPages/chatRoom.less'

const DrawModal = dragDecorator(ChatRoomDraw)
@connect(({chat_store}) => {return {chat_store}})
export default class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.isFocus = false;
        this.state = {
            editorState: EditorState.createEmpty(),
            lists: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const { socket_message } = nextProps.chat_store;
        this.showMessageLists(socket_message);
    }

    async componentDidMount() {
        const { flag, data } = await this.http({url: '/chat', method: 'get'});
        if(flag) {
            const results = data.map(val => {
                return {
                    ...val,
                    msg: {
                        __html: val.content
                    }
                }
            });
            this.setState({ lists: results}, _ => {
                this.chatRoomScrollTopBottom();
            });
        }
    }

    /**
     * 按下enter键发送信息
     */
    handlerTab(val) {
        const { blocks } = val;
        blocks.length > 1 && this.handlerEnter();
    }

    /**
     * 展示列表内容(数据处理)
     * @param {Object} data: {msg, name} 
     */
    showMessageLists(data) {
        const lists = [...this.state.lists];
        
        if(data.content) {
            lists.push({
                msg: {
                    __html: data.content
                },
                name: data.name,
                user: data.user
            });

            this.setState({ lists }, _ => {
            this.chatRoomScrollTopBottom();
        })
        }
    }

    render() {
        const { user } = this.props.chat_store;
        const { editorState, lists } = this.state;
        const messageLists = lists.map((list, index) => {
            return (
                <div key={index} 
                    className="chatroom-item"
                    style={{flexDirection: list.user == user.user ? 'row-reverse':'row'}} >
                    <div className="chatroom-avatar"></div>
                    <div style={{textAlign: list.user == user.user ? 'right':'left'}}>
                        <div className="chatroom-name">{list.name}</div>
                        <div className="chatroom-content" dangerouslySetInnerHTML={list.msg}></div>
                    </div>
                </div>
            )
        });

        return (
            // {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            <div className="chatroom">
                <div className="chatroom-show" ref="chatRoom">
                    {messageLists}
                </div>
                <Editor 
                    ref="editor"
                    className="chatroom-editor"
                    editorState={editorState}
                    onChange={this.handlerTab.bind(this)}
                    onEditorStateChange={this.onEditorStateChange.bind(this)}>
                </Editor>
            </div>
        )
    }

    modalDraw() {
        return (
            <Button onClick={this.openDrawModal}>你画我猜</Button>
        )
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        })
    }

    /**
     * 聊天区域滚动到底部
     */
    chatRoomScrollTopBottom() {
        const chat = this.refs.chatRoom;
        const distance = chat.scrollHeight - chat.offsetHeight;
        chat.scrollTop = distance;
    }

    /**
     * 回车事件保存到数据库
     * 在清空输入的内容
     */
    handlerEnter() {
        const { editorState } = this.state;
        const { socket, user } = this.props.chat_store;
        const results = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const params = {
            user: user.user,
            name: user.name
        }
        const results_detail = results.replace(/<p>(.*?)<\/p>/gi,'$1');
        if(results_detail !== '') {

            // 根据关键字显示不同内容
            const detailContent = this.accordKeywordTransformContent(results_detail);
            const contents = {
                ...params,
                content: detailContent ? detailContent : results
            }
            // 1.本地内容展示到chat区域
            this.showMessageLists(contents);

            // 2.推送到后台
            socket.emit('chat_clientsend', contents);

            // 3. 清空编辑内容
            this.setState({
                editorState: EditorState.createEmpty()
            })
        }
    }

    /**
     * 根据关键字显示不同内容
     * @param {HTML} origin: 原始内容文字
     * @return {String}
     */
    accordKeywordTransformContent(origin) {
        origin = origin.replace(/\s+/g, '');
        switch(origin) {
            // 1-9
            case '揉点': 
                const num = Number(Math.random().toFixed(1))*10;
            return num;
            default: return null;
        }
    }
}