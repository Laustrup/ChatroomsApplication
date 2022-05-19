import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";

const url: string = "https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

export const FETCH_BOARDS = "FETCH_CHATROOMS";
export const ADD_BOARD = "ADD_CHATROOM";

// UrlCommand consists of the value of which is used in the fetch url for different actions
async function firebaseResponse(getState: any, body?: any) {
    if (body!=null) {
        return (await fetch(url + getState().user.getIdToken, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }));        
    }
    else {
        return (await fetch(url + getState().user.getIdToken, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }));
    }
}

export const fetchBoards = function() {
    return async (dispatch: any, getState: any) => {
        const response = await firebaseResponse(getState);
        
        if (!response.ok) { console.log("Response from fetching boards was not ok..."); }
        else {
            const data = await response.json();
            let boards: Board[] = [];

            for (const i in data) {boards.push(data[i]);}

            dispatch({type: FETCH_BOARDS, payload: boards});
        }
    };
}

export const addBoard = function(board: Board) {
    return async (dispatch: any, getState: any) => {
        const response = await firebaseResponse(getState, board);

        if (!response.ok) {
            console.log("Response from adding board was not ok...");
        }
        else {
            const data = await response.json();

            console.log("data from response.", data);
            board.id = data.name;

            dispatch({type: ADD_BOARD, payload: board});
        }
    };
}
