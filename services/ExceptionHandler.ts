export default function emailIsValid(email: String) {
    if (email.includes("@")) {
        const splittedEmail = email.split("@");
        if (splittedEmail[1].includes(".")) {
            return true;
        }
    }
    else {
        console.log("Email " + email + " is not valid...");
        return false;
    }
}