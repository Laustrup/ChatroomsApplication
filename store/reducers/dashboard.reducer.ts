import { Board } from "../../entities/Board";
import { ADD_BOARD, FETCH_BOARDS } from "../actions/dashboard.actions";

interface ReduxState { boards: Board[]; }
const initialState: ReduxState = { boards: [] }

interface ReduxAction { type: string, payload?: number | string | Board }

const dashboardReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_BOARD:
            console.log("Add board payload...", action.payload);
            return { ...state, boards: [...state.boards, action.payload] };
        case FETCH_BOARDS: 
            console.log("Fetching board!");
            return {...state, boards: action.payload};

        default: return state;
    }
}

export default dashboardReducer;