import { Board } from "../entities/Board";
import { User } from "../entities/User";

export const publicBoards = function(boards: Board[]): Board[] {
    const filtered: Board[] = boards.filter(function(board: any): boolean { return board.isPublic; });
    return filtered;
}
export const userBoards = function(boards: Board[], user: User): Board[] {
    const filtered: Board[] = boards.filter(function(board: any): boolean { return board.author.email === user.email });
    return filtered;
}
