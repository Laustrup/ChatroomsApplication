// Not necessarily, since firebase validates as well.
export default function emailIsValid(email: String) {
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
