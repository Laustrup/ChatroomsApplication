import { Message } from "./Message"
import { User } from "./User";

export class Chatroom {

    private messages: Message[]

    constructor(private title: string, private users: User[]) {
        this.messages = [];
    }

    public getTitle() {return this.title;}
    public setTitle(title: string) {
        this.title = title;
        return this.title;
    }

    public getUsers() {return this.users;}
    public addUser(user: User) {this.users.push(user)}

    public getMessages() {return this.messages;}
    public addMessage(message: Message) {this.messages.push(message);}
}
