import { User } from "../../entities/User";
import { LOGIN, SIGNUP, LOGOUT, REHYDRATE_USER, EDIT, DELETE } from "../actions/user.actions";

interface ReduxState { loggedInUser: User | null, idToken: string | undefined }

const initialState: ReduxState = { loggedInUser: null, idToken: undefined }

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case REHYDRATE_USER:
            console.log("User is rehydrated!", action.payload.user);
            return { ...state, loggedInUser: null, idToken: undefined }
        case SIGNUP: 
            action.payload.user.idToken = action.payload.idToken;
            console.log("User is signed up!", action.payload.user);
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken };
        case LOGIN:
            action.payload.user.idToken = action.payload.idToken;
            console.log("User is logged in!", action.payload.user);
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken };   
        case EDIT:
            console.log("User is edited!", action.payload.user);
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken }
        case LOGOUT:
            console.log("User is logged out!");
            return { ...state, loggedInUser: null, idToken: undefined }
        case DELETE:
            console.log("User will be deleted!", action.payload.user);
            return {...state, loggedInUser: null, idToken: undefined }
            
        default: return state;
    }
}

export default userReducer;