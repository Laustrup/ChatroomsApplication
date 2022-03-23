import React from "react";
import { Chatroom } from "./entities/Chatroom";
import profileScreen from "./screens/ProfileScreen"
import userReducer from "./store/reducers/user.reducer";
import chatReducer from "./store/reducers/chatrooms.reducer";
import { Provider, useSelector } from "react-redux";
import { addChatroom } from "./store/actions/chatroom.actions";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./typings/navigations";
import { NavigationContainer } from "@react-navigation/native";

const stack = createNativeStackNavigator<StackParamList>();
const tab = createBottomTabNavigator();

const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms);

function ChatStackNavigator() {
  
  return (
      <stack.Navigator>
        <stack.Screen />
      </stack.Navigator>
  );
}

const store = createStore(combineReducers({
    user: userReducer,
    chat: chatReducer
  }), applyMiddleware(ReduxThunk)
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <tab.Navigator screenOptions={{ headerShown: false }}>
          <tab.Screen name="Profile" component={profileScreen} />
          {}
          <tab.Screen name="Chatrooms" component={ChatStackNavigator} />
          {}
        </tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function renderChatroom() {
  const chatroom: Chatroom = new Chatroom(title);
  dispatchEvent(addChatroom(chatroom));
}