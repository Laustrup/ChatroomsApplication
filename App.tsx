import React from "react";
import Navigation from "./components/Navigation";
import userReducer from "./store/reducers/user.reducer";
import chatReducer from "./store/reducers/chatrooms.reducer";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}