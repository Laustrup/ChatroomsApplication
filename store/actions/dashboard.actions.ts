import { Chatroom } from "../../entities/Chatroom";
import { Message } from "../../entities/Message";

const url: string = "https://shout-cb02d-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

export const FETCH_CHATROOMS = "FETCH_CHATROOMS";
export const ADD_CHATROOM = "ADD_CHATROOM";

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

export const fetchChatrooms = function() {
    return async (dispatch: any, getState: any) => {
        const response = await firebaseResponse(getState);
        
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
        const response = await firebaseResponse(getState, chatroom);

        if (!response.ok) {
            console.log("Response from adding chatroom was not ok...");
        }
        else {
            const data = await response.json();

            console.log("data from response.", data);
            chatroom.id = data.name;

            dispatch({type: ADD_CHATROOM, payload: chatroom});
        }
    };
}
