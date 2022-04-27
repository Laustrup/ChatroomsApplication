import { Chatroom } from "../../entities/Chatroom";

const fetchUrl: string = "https://chatrooms-44d4d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

export const FETCH_CHATROOMS = "FETCH_CHATROOMS";
export const ADD_CHATROOM = "ADD_CHATROOM";

export const fetchChatrooms = function() {
    return async (dispatch: any, getState: any) => {
        const response = await fetch(
            fetchUrl + getState().user.getIdToken, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
        
        if (!response.ok) { console.log("Response from fetching chatrooms was not ok..."); }
        else {
            const data = await response.json();
            let chatrooms: Chatroom[] = [];

            for (const i in data) {chatrooms.push(data[i]);}

            dispatch({type: "FETCH_CHATROOMS", payload: chatrooms});
        }
    };
}

export const addChatroom = function(chatroom: Chatroom) {
    return async (dispatch: any, getState: any) => {
        const response = await fetch(
            fetchUrl + getState().user.getIdToken, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(chatroom)
        });

        if (!response.ok) {
            console.log("Response from adding chatroom was not ok...");
        }
        else {
            const data = await response.json();

            console.log("data from response.", data);
            chatroom.declareId = data.name;

            dispatch({type: ADD_CHATROOM, payload: chatroom});
        }
    };
}