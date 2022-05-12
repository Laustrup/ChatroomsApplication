import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";
import { ADD_CHATROOM, FETCH_CHATROOMS, WRITE_MESSAGE } from "../actions/dashboard.actions";

interface ReduxState { 
    chatrooms: Chatroom[];
    chatroomIndex: number;
}
const initialState: ReduxState = { 
    chatrooms: [],
    chatroomIndex: -1
}

interface ReduxAction { type: string, payload?: number | string | Chatroom | Message }

const dashboardReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log(action.payload);
            const chatroom = action.payload as Chatroom;
            state.chatrooms.push(chatroom);
            return { ...state, chatrooms: [...state.chatrooms, chatroom] };
        case FETCH_CHATROOMS: return {...state,chatrooms: action.payload};
        case WRITE_MESSAGE:
            console.log(action.payload);
            const currentChatroom = state.chatrooms[state.chatroomIndex].messages;
            currentChatroom.push(action.payload as Message);
            return { ...state, currentChatroom};

        default: return state;
    }
}

export default dashboardReducer;