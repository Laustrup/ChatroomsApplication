//import * as SecureStore from "expo-secure-store";
import { Firebase } from "../../entities/FireBase";
import { User } from "../../entities/User";

// ACtions titles for the reducer to handle
export const REHYDRATE_USER = "REHYDRATE_USER";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const GET = "GET";
export const EDIT = "EDIT";
export const LOGOUT = "LOGOUT";

// Fetch url values
const url = "https://identitytoolkit.googleapis.com/v1/accounts:";
const apiKey = "AIzaSyBFIYtngh2gF8SQjPRfzn6k75vhYOSLAIo";

// UrlCommand consists of the value of which is used in the fetch url for different actions
enum UrlCommand { update, lookup, signUp, signInWithPassword }
function fetchUrl(command: UrlCommand) {
    const fetchUrl = url + command.toString + "?key=" + apiKey;
    // Delete this log, when testing is done
    console.log("Fetch url",fetchUrl);
    return fetchUrl;
}
function firebaseResponse(user: User, command: UrlCommand) {
    return ( async function() {
        if (command == UrlCommand.lookup) {
            console.log("Response will lookup user!");
            return await fetch(fetchUrl(command), {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: user.email,
                    returnSecureToken: true
                })
            });
        }
        else if (user.title==null) {
            console.log("Response will login user!");
            return await fetch(fetchUrl(command), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: user.email,
                    password: user.password,
                    returnSecureToken: true
                })
            });
        }
        else {
            return await fetch(fetchUrl(command), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: user.email,
                    password: user.password,
                    title: user.title,
                    chatrooms: user.Chatrooms,
                    photo: user.photo,
                    returnSecureToken: true
                })
            });
        }
    });
}
async function responseAct(response: any, dispatch: any, type: string) {
    if (!response.ok) {console.log("Response for " + type + " of user was not ok...");}
    else {
        const data: Firebase = await response.json();
        console.log("data from server", data);
        dispatch({ type, payload: { user: new User(response.email), idToken: data.idToken}});
    }
}

export const rehydrateUser = (user: User, idToken: string) => {return { type: REHYDRATE_USER, payload: {user,idToken} }}

export const login = function(email: string, password: string) {
    return async (dispatch: any) => { responseAct(firebaseResponse(new User(email,password),UrlCommand.signInWithPassword), dispatch, LOGIN); }
}
export const signup = function(email: string, password: string, title: string) {
    return async (dispatch: any) => { responseAct(firebaseResponse(new User(email,password,title),UrlCommand.signUp), dispatch, SIGNUP); }
}
export const get = function(email: string) {
    return async (dispatch: any) => { responseAct(firebaseResponse(new User(email),UrlCommand.lookup), dispatch, GET); }
}
export const edit = function(user: User) {
    return async (dispatch: any) => { responseAct(firebaseResponse(user,UrlCommand.update), dispatch, EDIT); }
}

/*
// TODO
export const logout = () => {
    SecureStore.deleteItemAsync("idToken");
    SecureStore.deleteItemAsync("user");

    return { type: LOGOUT }
}
*/