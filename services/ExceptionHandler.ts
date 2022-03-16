function isEmailValid(email: String) {
    if (email.includes("@")) {
        const splittedEmail = email.split("@");
        if (splittedEmail.includes(".")) {
            return true;
        }
    }
    return false;
}