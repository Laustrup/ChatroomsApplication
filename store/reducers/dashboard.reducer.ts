import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";
import { ADD_CHATROOM, FETCH_CHATROOMS } from "../actions/dashboard.actions";

interface ReduxState { chatrooms: Chatroom[]; }
const initialState: ReduxState = { chatrooms: [] }

interface ReduxAction { type: string, payload?: number | string | Chatroom }

const dashboardReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log("Add chatroom payload...", action.payload);
            const chatroom = action.payload as Chatroom;
            state.chatrooms.push(chatroom);
            return { ...state, chatrooms: [...state.chatrooms, chatroom] };
        case FETCH_CHATROOMS: 
            console.log("Fetching chatroom!");
            return {...state, chatrooms: action.payload};

        default:
            console.log("Case is default!",action.payload)
            return state;
    }
}

export default dashboardReducer;