import { FETCH_BOARD, WRITE_MESSAGE } from "../actions/board.action";
import { Board } from "../../entities/Board";
import { Message } from "../../entities/Message";

interface ReduxState { board: Board | null; }
const initialState: ReduxState = {board: null}

//interface ReduxAction {type: string, payload?: number | string | Message | Board }

const boardReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case FETCH_BOARD:
            console.log("Board payload...", action.payload);
            state.board = action.payload.board;
            return {...state, board: action.payload};
        case WRITE_MESSAGE:
            console.log("Write message payload...", action.payload);
            if (state.board!=null) { state.board.messages.push(action.payload as Message); }
            return { ...state, board: state.board};
        
        default: 
            console.log("Case is default!", action.payload);
            return state;
    }
}

export default boardReducer;