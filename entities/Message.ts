import { User } from "./User";

export class Message {

    public timestamp: Date;
    public timeDisplay: string;

    constructor(public content: string, public author: User, public id?: number) {
        this.timestamp = new Date();

        const date: Date = this.timestamp; 
        this.timeDisplay = date.getFullYear + ": " + date.getDay + " - " + date.getHours + " - " + date.getMinutes;
    }

}