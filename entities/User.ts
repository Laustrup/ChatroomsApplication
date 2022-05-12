export class User {
    constructor(public email: string, public title?: string, public password?: string, public photo?: File) {}

    // Gets created to insure of optional
    public getTitle() { 
        if (this.title != null) {return this.title;}
        else {return "There is no title to this user..."}
    }
    public getPassword() {
        if (this.password != null) {return this.password;}
        else {return "There is no password to this user..."}
    }

}