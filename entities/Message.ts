import { User } from "./User";

export class Message {

    private isRead: boolean;
    private timestamp: Date;

    constructor(private author: User, private content: string) {
        this.isRead = false;
        this.timestamp = new Date();
    }

    public getAuthor() {return this.author;}

    public getContent() {return this.content;}
    public setContent(content: string) {
        this.content = content;
        return this.content;
    }

    public getTimestamp() {return this.timestamp;}

    public isMessageRead() {return this.isRead;}
    public changeIsRead() {
        if (!this.isRead) {
            this.isRead = true;
        }
    }

}