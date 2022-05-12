//import * as SecureStore from "expo-secure-store";
import { Firebase } from "../../entities/FireBase";
import { User } from "../../entities/User";

import getAuth, {firebase} from "@react-native-firebase/auth";

export const REHYDRATE_USER = "REHYDRATE_USER";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Fetch url values
const apiKey = "AIzaSyBFIYtngh2gF8SQjPRfzn6k75vhYOSLAIo";
const identityUrl = "https://identitytoolkit.googleapis.com/v1/accounts:"

const auth = getAuth();

export const rehydrateUser = (user: User, idToken: string) => {return { type: REHYDRATE_USER, payload: {user,idToken} }}

/*
export const logout = () => {
    SecureStore.deleteItemAsync("idToken");
    SecureStore.deleteItemAsync("user");

    return { type: LOGOUT }
}
*/

export const login = function(email: string, password: string) {
    return async (dispatch: any) => {
        const response = await fetch(identityUrl + "signInWithPassword?key=" + apiKey, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {console.log("Response for login of user was not ok...");}
        else {
            const data: Firebase = await response.json();
            console.log("data from server", data);

            dispatch({ type: LOGIN, payload: { user: new User(email), idToken: data.idToken}});
        }
    }
}

export const signup = function(email: string, title: string, password: string) {
    return async (dispatch: any) => {
        const response = await fetch(identityUrl + "signUp?key=" + apiKey, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                title: title,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {console.log("Response for signup of user was not ok...");}
        else {
            const data: Firebase = await response.json();
            console.log("data from server", data);

            dispatch({ type: SIGNUP, payload: { user: new User(email,title), idToken: data.idToken }});
        }
    };
}

export const logout = function() {auth.signOut().then(() => console.log('User signed out!'));}


// TODO
export const getUser = function(email: string) {
    return async (dispatch: any) => {
        const response = await fetch(identityUrl + apiKey)
        if (!response.ok) {console.log("Couldn't get user...");}
        else {
            const data: Firebase = await response.json();
            dispatch({ type: SIGNUP, payload: { user: new User(email), idToken: data.idToken }});
        }
    }
}