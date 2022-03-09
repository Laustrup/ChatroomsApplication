export class User {

    constructor(private title: string, private password: string, private photoUrl?: string) {}

    public getTitle() {return this.title;}
    public setTitle(title: string) {
        this.title = title;
        return this.title;
    }

    public getPassword() {return this.password;}
    public setPassword(newPassword: string, oldPassword: string) {
        if (oldPassword == this.password) {
            this.password = newPassword;
            return this.password;
        }
        return null;
    }

    public getPhotoUrl() {return this.photoUrl;}
    public setPhotoUrl(photoUrl: string) {
        this.photoUrl = photoUrl;
        return this.photoUrl;
    }
}