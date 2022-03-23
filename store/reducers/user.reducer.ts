import { User } from "../../entities/User";
import { LOGIN, SIGNUP } from "../actions/user.actions";

interface ReduxState {loggedInUser: User}

const initialState: ReduxState = {loggedInUser: {} as User}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP: 
            console.log("User is signed up!");
            return { ...state, User: action.payload as User };
        case LOGIN:

            console.log("User is logged in!");
            return state;   
        default: return state;
    }
}

export default userReducer;