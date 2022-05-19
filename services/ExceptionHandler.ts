import { useSelector } from "react-redux";

// Not necessarily, since firebase validates as well.
export function emailIsValid(email: String) {
    if (email.includes("@")) {
        const splittedEmail = email.split("@");
        if (splittedEmail[1].includes(".")) {
            return true;
        }
    }
    else {
        // Although firebase validates, it's good to have this else statement, to check that the email is the issue.
        console.log("Email " + email + " is not valid...");
        return false;
    }
}

export function boardTitleExists(title: string) {
    useSelector((state: any) => state.dashboard.boards).forEach((board: { title: string; }) => {
        if (board.title == title) {return true;}
    });
    return false;
}