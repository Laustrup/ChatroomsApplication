import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { RootState } from "../App";
import { StackParamList } from "./../typings/navigations";
import { Chatroom } from "../entities/Chatroom";
import ReduxState from "../store/reducers/chatrooms.reducer";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

var chatrooms: Chatroom[];

function ChatStackNavigator() {

    chatrooms = useSelector((state: any) => state.chatroom.chatrooms);

    return (
        <Stack.Navigator>
            {renderChats}
        </Stack.Navigator>
    )
}
function renderChats() {
    /*
    var chats: Element[];

    chatrooms.forEach(chatroom => {
        chats.pop(<Stack.Screen name="Screen2" component={chatroom} />)
    })
    
    return chats;
    */
}

export default function Navigation() {
    const user = useSelector((state: any) => state.user.loggedInSUser);

    return (
        <NavigationContainer>
            {user !== null ? (
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={ProfileScreen} />
                    <Tab.Screen name="Chats" component={ChatStackNavigator} />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Signup" component={SignUpScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}