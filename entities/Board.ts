import { Message } from "./Message"

export class Board {
    constructor(public title: string, public messages: Message[], public index: number, public id?: string) {}
}
