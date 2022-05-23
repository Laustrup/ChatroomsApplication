//import * as SecureStore from "expo-secure-store";
import { Firebase } from "../../entities/FireBase";
import { User } from "../../entities/User";

// Action titles for the reducer to handle
export const REHYDRATE_USER = "REHYDRATE_USER";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const GET = "GET";
export const EDIT = "EDIT";
export const LOGOUT = "LOGOUT";
export const DELETE = "DELETE";

// Fetch url values
const url = "https://identitytoolkit.googleapis.com/v1/accounts:";
const apiKey = "AIzaSyBFIYtngh2gF8SQjPRfzn6k75vhYOSLAIo";

// UrlCommand consists of the value of which is used in the fetch url for different actions
enum UrlCommand { Update = "update", Lookup = "lookup", SignUp = "signUp", SignInWithPassword = "signInWithPassword", Delete = "delete" }
function fetchUrl(command: UrlCommand) {
    const fetch = url + command + "?key=" + apiKey;
    // Delete this log, when testing is done
    console.log("Fetch url",fetch);
    return fetch;
}
async function firebaseResponse(user: User, command: UrlCommand, dispatch: any, type: string, password?: string) {
    console.log(command);
    if (command == UrlCommand.SignInWithPassword || command == UrlCommand.SignUp) {
        responseAct(await fetch(fetchUrl(command), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: user.email,
                password: password,
                returnSecureToken: true
            })
        }),dispatch,type);
    }
    if (command == UrlCommand.Delete) {
        responseAct(await fetch(fetchUrl(command), {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user})
        }),dispatch,type);
    }
    else {
        responseAct(await fetch(fetchUrl(command), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user,
                returnSecureToken: true
            })
        }),dispatch,type);
    }
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
    return (dispatch: any) => {firebaseResponse(new User(email), UrlCommand.SignInWithPassword, dispatch, LOGIN, password);}
}
export const signup = function(email: string, password: string) {
    return (dispatch: any) => { firebaseResponse(new User(email), UrlCommand.SignUp, dispatch, SIGNUP, password); }
}
export const edit = function(user: User) {
    return (dispatch: any) => { firebaseResponse(user, UrlCommand.Update, dispatch, EDIT); }
}
export const deleteAccount = function(user: User) {
    return (dispatch: any) => { firebaseResponse(user,UrlCommand.Delete,dispatch, DELETE); }
}

// TODO
export const getUser = async function(user: User) {
    const response = await fetch(fetchUrl(UrlCommand.Lookup), {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            idToken: user.idToken,
            email: user.email,
            returnSecureToken: true
        })
    });

    if (!response.ok) {console.log("Response for " + UrlCommand.Lookup + " of user was not ok...");}
    else {
        const data: User = await response.json();
        console.log("User data from server", data);

        return data;
    }
}

export const logout = function() { return (dispatch: any) => { dispatch(LOGOUT); }}

/*
export const logout = () => {
    SecureStore.deleteItemAsync("idToken");
    SecureStore.deleteItemAsync("user");

    return { type: LOGOUT }
}
*/