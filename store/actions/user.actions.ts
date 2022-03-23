import { Firebase } from "../../entities/FireBase"

export const SIGNUP = "SIGNUP";

export const signup = function(email: string, title: string, password: string) {
    return async (dispatch: any) => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtN9UD-8WQ3KJO-UjGYNdDpYI6pGk0uyM", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "title": title,
                "password": password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            console.log("Response for signup of user was not ok...")
        }
        else {
            const data: Firebase = await response.json();
            console.log("data from server", data);

            dispatch({ type: SIGNUP, payload: {email: data.getEmail, idToken: data.getIdToken}
            })
        }
    };
}
