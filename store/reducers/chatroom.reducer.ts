import { FETCH_CHATROOM, WRITE_MESSAGE } from "../actions/chatroom.action";
import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";

interface ReduxState { chatroom: Chatroom; }
const initialState: ReduxState = {chatroom: new Chatroom("Initial chatroom",[new User("email")])}

interface ReduxAction {type: string, payload?: number | string | Message | Chatroom }

const chatroomReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case FETCH_CHATROOM:
            console.log("Chatroom payload...", action.payload);
            state.chatroom = action.payload.chatroom;
            return {...state, chatroom: action.payload};
        case WRITE_MESSAGE:
            console.log("Write message payload...", action.payload);
            state.chatroom.messages.push(action.payload as Message);
            return { ...state, chatroom: state.chatroom};
    }
}

export default chatroomReducer;