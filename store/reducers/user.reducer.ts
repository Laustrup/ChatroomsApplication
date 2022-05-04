import { User } from "../../entities/User";
import { LOGIN, SIGNUP, LOGOUT, REHYDRATE_USER } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: null,
    idToken: undefined
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case REHYDRATE_USER:
            console.log("User is rehydrated!");
            return {...state,loggedInUser: action.payload.user,idToken:action.payload.idToken}
        case SIGNUP: 
            console.log("User is signed up!");
            return { ...state, User: action.payload as User };
        case LOGIN:
            console.log("User is logged in!");
            return { ...state, User: action.payload as User, idToken: action.payload.idToken };   
        case LOGOUT:
            console.log("User is logged out!");
            return {...state,loggedInUser: null,idToken: undefined}
        default: return state;
    }
}

export default userReducer;