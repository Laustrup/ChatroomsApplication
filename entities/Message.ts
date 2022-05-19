import { User } from "./User";

export class Message {

    public timestamp: Date;

    constructor(public content: string, public id?: string) {this.timestamp = new Date();}
}