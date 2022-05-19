import { Board } from "../../entities/Board";
import { ADD_BOARD, FETCH_BOARDS } from "../actions/dashboard.actions";

interface ReduxState { boards: Board[]; }
const initialState: ReduxState = { boards: [] }

interface ReduxAction { type: string, payload?: number | string | Board }

const dashboardReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_BOARD:
            console.log("Add board payload...", action.payload);
            const board = action.payload as Board;
            state.boards.push(board);
            return { ...state, boards: [...state.boards, board] };
        case FETCH_BOARDS: 
            console.log("Fetching board!");
            return {...state, boards: action.payload};

        default:
            console.log("Case is default!",action.payload)
            return state;
    }
}

export default dashboardReducer;