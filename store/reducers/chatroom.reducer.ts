import { FETCH_CHATROOM, WRITE_MESSAGE } from "../actions/chatroom.action";
import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";

interface ReduxState { chatroom: Chatroom | null; }
const initialState: ReduxState = {chatroom: null}

//interface ReduxAction {type: string, payload?: number | string | Message | Chatroom }

const chatroomReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case FETCH_CHATROOM:
            console.log("Chatroom payload...", action.payload);
            state.chatroom = action.payload.chatroom;
            return {...state, chatroom: action.payload};
        case WRITE_MESSAGE:
            console.log("Write message payload...", action.payload);
            if (state.chatroom!=null) { state.chatroom.messages.push(action.payload as Message); }
            return { ...state, chatroom: state.chatroom};
        
        default: 
            console.log("Case is default!", action.payload);
            return state;
    }
}

export default chatroomReducer;