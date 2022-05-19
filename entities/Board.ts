import { Message } from "./Message"

export class Board {
    constructor(public title: string, public messages: Message[], public id?: string) {}
}
