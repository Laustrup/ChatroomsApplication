import { Chatroom } from "./Chatroom";

export class User {
    constructor(public email: string, public password?: string, public title?: string, public Chatrooms?: Chatroom[] , public photo?: File) {}

}