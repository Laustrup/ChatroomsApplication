import { User } from "./User";

export class Message {

    public timestamp: Date;

    constructor(public content: string, public author: User, public id?: number) {this.timestamp = new Date();}
}