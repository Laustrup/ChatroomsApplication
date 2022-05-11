import { User } from "./User";

export class Message {

    private isRead: boolean;
    public timestamp: Date;

    constructor(public author: User, public content: string) {
        this.isRead = false;
        this.timestamp = new Date();
    }
    public isMessageRead() {return this.isRead;}
    public changeIsRead() {
        if (!this.isRead) {
            this.isRead = true;
        }
    }

}