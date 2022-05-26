import { Message } from "./Message"
import { User } from "./User";

export class Board {

    public timestamp: Date;
    public timeDisplay: string;
    
    constructor(public title: string, public messages: Message[], public author: User, public isPublic: boolean, public id: any, timestamp?: Date) {
        if (timestamp==null) { this.timestamp = new Date(); }
        else { this.timestamp = timestamp; }

        const date: Date = this.timestamp;         
        this.timeDisplay = date.getFullYear + ": " + date.getDay + " - " + date.getHours + " - " + date.getMinutes;
    }
}
