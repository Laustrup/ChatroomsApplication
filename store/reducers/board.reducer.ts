import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";
import { ADD_BOARD, DELETE_BOARD, FETCH_BOARD, FETCH_BOARDS, WRITE_MESSAGE } from "../actions/board.actions";

interface ReduxState { 
    boards: Board[];
    currentBoard: Board | null;
}
const initialState: ReduxState = {
    boards: [],
    currentBoard: null
    }

interface ReduxAction { type: string, payload?: number | string | Board | Message }

const boardReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_BOARD:
            console.log("Add board payload...", action.payload);
            return { ...state, boards: [...state.boards, action.payload] };
        case FETCH_BOARDS: 
            console.log("Fetching boards!");
            return {...state, boards: action.payload};
        case FETCH_BOARD:
            console.log("Board payload...", action.payload);
            return {...state, currentBoard: action.payload};
        case WRITE_MESSAGE:
            console.log("Write message payload...", action.payload);
            return {...state, currentBoard: action.payload}
        case DELETE_BOARD:
            console.log("Delete board payload...", action.payload);
            return {...state, currentBoard: null };

        default: return state;
    }
}

export default boardReducer;