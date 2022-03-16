export const SIGNUP = "SIGNUP";

export const signup = function(email: string, title: string, password: string) {
    return async (dispatch: (arg0: { type: string; payload: string}) => void) => {
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
            const data = await response.json();
            console.log("data from server", data);

            dispatch({ type: SIGNUP, payload: "something to pass to reducer"})
        }
    };
}
