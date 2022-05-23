import { DELETE_BOARD, FETCH_BOARD, WRITE_MESSAGE } from "../actions/board.action";
import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";

interface ReduxState { board: Board | null; }
const initialState: ReduxState = {board: null}

// interface ReduxAction {type: string, payload?: number | string | Message | Board }

const boardReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case FETCH_BOARD:
            console.log("Board payload...", action.payload);
            return {...state, board: action.payload};
        case WRITE_MESSAGE:
            console.log("Write message payload...", action.payload);
            return {...state, board: action.payload}
        case DELETE_BOARD:
            console.log("Delete board payload...", action.payload);
            return {...state, board: null };

        default: return state;
    }
}

export default boardReducer;