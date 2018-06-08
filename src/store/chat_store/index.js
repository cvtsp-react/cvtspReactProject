const initialState = {
    socket: null,
    socket_message: '',
    user: {}
}

const mutations = {
    setSocket(state, params) {
        if(!state.socket) {
            return Object.assign({}, state, {
                socket: params
            })
        }
        return state;
        
    },
    socketChatMessage(state, params) {
        return Object.assign( {}, state, {
            socket_message: params
        })
    },
    save_user(state, params) {
        return Object.assign({}, state, {
            user: params
        })
    }
}

export default function(state=initialState, action) {
    switch(action.type) {
        case 'websocket': return mutations.setSocket(state, action.payload);
        case 'chatMessage': return mutations.socketChatMessage(state, action.payload);
        case 'save_user': return mutations.save_user(state, action.payload);
        default: return initialState;
    }
}