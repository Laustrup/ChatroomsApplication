import { Board } from "../entities/Board";

const userUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
const apiKey = "AIzaSyBFIYtngh2gF8SQjPRfzn6k75vhYOSLAIo";

export function emailIsValid(email: String) {
    if (email!=undefined && email.includes("@")) {
        const splittedEmail = email.split("@");
        if (splittedEmail[1].includes(".")) {
            return true;
        }
    }
    return false;    
}

export function passwordCheck(input: string | any) {    
    if (input !== undefined) {
        let password = input;

        if (password.length >= 6) {
            for (let i = 0; i < password.length; i++) {
                try {
                    console.log(password.charAt(i))
                    password.charAt(i) < 10;
                    return true;
                } catch {}
            }
        }
    }
    return false;
}

export async function userExists(email: string, password: string) {
    const response = await fetch(userUrl + "signInWithPassword?key=" + apiKey, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    });
    return response.ok;
}

export function boardTitleExists(title: string, boards: Board[]) {
    if (boards!=undefined || title!=undefined) {
        boards.forEach((board: { title: string; }) => {
            if (board.title == title) {
                console.log("Board title exists!");
                return true;}
        });
        console.log("Board title doesn't exist!");
    }
    return false;
}