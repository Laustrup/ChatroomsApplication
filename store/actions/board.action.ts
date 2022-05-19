import { Message } from "../../entities/Message";

export const FETCH_BOARD = "FETCH_CHATROOM";
export const WRITE_MESSAGE = "WRITE_MESSAGE";

export const fetchBoard = function(index: number) {
    return (dispatch: any, getState: any) => {
        const chatroom = getState().chatroom.chatrooms[index];
        dispatch({type: FETCH_BOARD, chatroom})
    };
}

export const addMessage = function(message: Message) {
    return async (dispatch: any) => { dispatch({type: WRITE_MESSAGE, message}) }
}