import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";

const url: string = "https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/boards.json?auth=";

export const FETCH_BOARD = "FETCH_CHATROOM";
export const WRITE_MESSAGE = "WRITE_MESSAGE";
export const DELETE_BOARD = "DELETE_BOARD";

export const fetchBoard = function(board: Board) {
    return (dispatch: any) => {
        dispatch({type: FETCH_BOARD, payload: board})
    }
}

export const addMessage = function(message: Message) {
    return (dispatch: any) => { dispatch({type: WRITE_MESSAGE, payload: message}) }
}

export const deleteBoard = function(board: Board) {
    return async (dispatch: any, getState: any) => {
        const response = await fetch(url + getState().user.idToken, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...board, board: null})
        });

        if (!response.ok) { console.log("Response from adding board was not ok..."); }
        else {
            const data = await response.json();
            console.log("data from response...", data);

            dispatch({type: DELETE_BOARD, payload: board})
        }
    }
}