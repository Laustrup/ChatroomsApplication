import React from "react";
import userReducer from "./store/reducers/user.reducer";
import chatReducer from "./store/reducers/chatrooms.reducer";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./typings/navigations";
import { NavigationContainer } from "@react-navigation/native";

const stack = createNativeStackNavigator<StackParamList>();
const tab = createBottomTabNavigator();

function ChatStackNavigator() {
  
  return (
      <stack.Navigator>
        <stack.Screen name="Dashboard" component={DashboardScreen} />
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
          <tab.Screen name="Profile" component={ProfileScreen} />
          <tab.Screen name="Dashboard" component={DashboardScreen} />
        </tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}