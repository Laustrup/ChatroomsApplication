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
    if (command === UrlCommand.SignInWithPassword || command === UrlCommand.SignUp) {
        console.log("User will be " + command + "!",user);
        responseAct(await fetch(fetchUrl(command), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: user.email,
                password: password,
                returnSecureToken: true
            })
        }), dispatch, type, command);
    }
    if (command === UrlCommand.Delete) {
        console.log("User will be deleted!",user);
        responseAct(await fetch(fetchUrl(command), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({idToken: user.idToken})
        }), dispatch, type, command);
    }
    else {
        console.log("User action is default!")
        responseAct(await fetch(fetchUrl(command), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user, returnSecureToken: true})
        }), dispatch, type, command);
    }
}
async function responseAct(response: any, dispatch: any, type: string, command: UrlCommand) {
    if (!response.ok) {console.log("Response for " + type + " of user was not ok...");}
    else {
        //const data: Firebase = await response.json();
        const data = await response.json();
        console.log("data from server", data);
        if (command!=UrlCommand.Delete) {
            dispatch({ type, payload: { user: new User(data.email,data.displayName,data.idToken,data.photoUrl), idToken: data.idToken}});
        } else {
            dispatch({ type });
        }
    }
}

export const rehydrateUser = (user: User, idToken: string) => { return { type: REHYDRATE_USER, payload: {user,idToken} } }

export const login = function(email: string, password: string) {
    return (dispatch: any) => { firebaseResponse(new User(email), UrlCommand.SignInWithPassword, dispatch, LOGIN, password); }
}
export const signup = function(email: string, password: string) {
    return (dispatch: any) => { firebaseResponse(new User(email), UrlCommand.SignUp, dispatch, SIGNUP, password); }
}
export const edit = async function(user: User, dispatch: any) { 
        console.log(user);
        responseAct(await fetch(fetchUrl(UrlCommand.Update), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                idToken: user.idToken,
                displayName: user.displayName,
                photoUrl: user.photoUrl,
                returnSecureToken: true
            })
        }), dispatch, EDIT, UrlCommand.Update);
}

export const deleteAccount = function(user: User, dispatch: any) { firebaseResponse(user,UrlCommand.Delete,dispatch, DELETE); }

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

export const logout = function(dispatch: any) {
    console.log(dispatch);
    dispatch({type: LOGOUT}); 
}

/*
export const logout = () => {
    SecureStore.deleteItemAsync("idToken");
    SecureStore.deleteItemAsync("user");

    return { type: LOGOUT }
}
*/