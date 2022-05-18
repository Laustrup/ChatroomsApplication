import { Message } from "../../entities/Message";

export const FETCH_CHATROOM = "FETCH_CHATROOM";
export const WRITE_MESSAGE = "WRITE_MESSAGE";

export const fetchChatroom = function(index: number) {
    return (dispatch: any, getState: any) => {
        const chatroom = getState().chatroom.chatrooms[index];
        dispatch({type: FETCH_CHATROOM, chatroom})
    };
}

export const addMessage = function(message: Message) {
    return async (dispatch: any) => { dispatch({type: WRITE_MESSAGE, message}) }
}