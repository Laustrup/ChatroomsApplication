import React from "react";
import Navigation from "./components/Navigation";
import userReducer from "./store/reducers/user.reducer";
import dashboardReducer from "./store/reducers/dashboard.reducer";
import boardReducer from "./store/reducers/board.reducer";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { ImageBackground } from "react-native";

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  board: boardReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default function App() { return (<Provider store={createStore(rootReducer, applyMiddleware(ReduxThunk))}><Navigation /></Provider>) }