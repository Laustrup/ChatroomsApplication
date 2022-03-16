import { Chatroom } from "../../entities/Chatroom";
import { ADD_CHATROOM } from "../actions/chatroom.actions";

interface ReduxState {
    chatrooms: Chatroom[]
    counter: number
    name: string
}

const initialState: ReduxState = {
    // TODO change default hardcoded values
    chatrooms: [],
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log(action.payload);
            const chatroom = action.payload as Chatroom;
            state.chatrooms.push(chatroom);
            return { ...state, chatrooms: [...state.chatrooms, chatroom] };

        default:
            return state;
    }
}

export default chatReducer;