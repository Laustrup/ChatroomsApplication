import { Message } from "./Message"
import { User } from "./User";

export class Board {

    public timestamp: Date;

    constructor(public title: string, public messages: Message[], public author: User, public isPublic: boolean, public id?: string) {this.timestamp = new Date();}
}
