import { Message } from "./Message"
import { User } from "./User";

export class Chatroom {

    public messages: Message[];
    public id: string = "";

    constructor(public title: string, public users: User[]) {this.messages = [];}
}
