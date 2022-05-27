import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";
import { boardTitleExists } from "../../services/ExceptionHandler";

const url: string = "https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/boards.json?auth=";

export const FETCH_BOARDS = "FETCH_BOARDS";
export const ADD_BOARD = "ADD_BOARD";
export const FETCH_BOARD = "FETCH_BOARD";
export const WRITE_MESSAGE = "WRITE_MESSAGE";
export const DELETE_BOARD = "DELETE_BOARD";

async function firebaseResponse(getState: any, board?: Board) {
    if (board==undefined) {
        console.log("Response will get boards!", board);
        return (await fetch(url + getState().user.idToken, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }));   
    }
    else {
        console.log("Request is default!", board);
        return (await fetch(url + getState().user.idToken, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: board.title,
                author: board.author,
                isPublic: board.isPublic,
                timeStamp: board.timestamp
            })
        }));
    }
}

export const fetchBoards = function() {
    return async (dispatch: any, getState: any) => {
        const response = await firebaseResponse(getState);
        
        if (!response.ok) { console.log("Response from fetching boards was not ok..."); }
        else {
            const data = await response.json();
            if (data!=null) {console.log("data from response...", data.id);}
            
            let boards: Board[] = [];

            for (const i in data) {
                boards.push(new Board(data[i].title,data[i].messages,data[i].author,data[i].isPublic,i,data[i].timestamp));
            }

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

export const fetchBoard = function(board: Board, dispatch: any) { dispatch({type: FETCH_BOARD, payload: board}) }

export const addMessage = function(board: Board, message: Message) {
    return async (dispatch: any) => {
        if (board.messages == undefined) { board.messages = []; }
        board.messages.push(message);

        console.log(board.messages)

        const response = await fetch("https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/boards/" + board.id + ".json", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: board.title,
                author: board.author,
                isPublic: board.isPublic,
                timeStamp: board.timestamp,
                messages: board.messages
            })
        })
        const data = await response.json();
    
        console.log("data from response...", data);

        dispatch({type: WRITE_MESSAGE, payload: board});
    }
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