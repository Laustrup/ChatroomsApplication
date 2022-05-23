import { Board } from "../../entities/Board";
import { boardTitleExists } from "../../services/ExceptionHandler";

const url: string = "https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/boards.json?auth=";

export const FETCH_BOARDS = "FETCH_CHATROOMS";
export const ADD_BOARD = "ADD_CHATROOM";

async function firebaseResponse(getState: any, body?: Board) {
    console.log(body);

    if (body==undefined) {
        console.log("Response will get boards!")
        return (await fetch(url + getState().user.idToken, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }));   
    }
    else {
        console.log("Request is default!")
        return (await fetch(url + getState().user.idToken, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({body,returnSecureToken: true})
        }));
    }
}

export const fetchBoards = function() {
    return async (dispatch: any, getState: any) => {
        const response = await firebaseResponse(getState);
        
        if (!response.ok) { console.log("Response from fetching boards was not ok..."); }
        else {
            const data = await response.json();
            console.log("data from response...", data);
            
            let boards: Board[] = [];

            for (const i in data) {boards.push(data[i]);}

            dispatch({type: FETCH_BOARDS, payload: boards});
        }
    };
}

export const addBoard = function(board: Board, boards: Board[]) {
    return async (dispatch: any, getState: any) => {

        if (!boardTitleExists(board.title,boards)) {
            const response = await firebaseResponse(getState, board);
            
            if (!response.ok) { console.log("Response from adding board was not ok..."); }
            else {
                const data = await response.json();
    
                console.log("data from response...", data);
                board.id = data.name;
    
                dispatch({type: ADD_BOARD, payload: board});
            }
        }
    };
}
