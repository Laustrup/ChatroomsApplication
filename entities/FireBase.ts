export class Firebase {

    /*
        idToken	string	A Firebase Auth ID token for the newly created user.
        email	string	The email for the newly created user.
        refreshToken	string	A Firebase Auth refresh token for the newly created user.
        expiresIn	string	The number of seconds in which the ID token expires.
        localId	string	The uid of the newly created user. 
    */

    constructor(private idToken: string, private email: string, private refreshToken: string,
        private expiresIn: string, private localId: string) {}

    // Only have get methods, for capsulating private attributes, since the firebase values isn't manipulated.
    public getIdToken() {return this.idToken;}
    public getEmail() {return this.email;}
    public getRefreshToken() {return this.refreshToken;}
    public getExpiresIn() {return this.expiresIn;}
    public getLocalId() {return this.localId;}

}