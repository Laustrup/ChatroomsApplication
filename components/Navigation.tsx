import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { StackParamList } from "./../typings/navigations";
import { RootState } from '../App';
import SignUpScreen from "../screens/not_logged_in/SignUpScreen";
import ProfileScreen from "../screens/logged_in/ProfileScreen";
import DashboardScreen from "../screens/logged_in/DashboardScreen";
import ChatScreen from '../screens/logged_in/BoardScreen';
import EditScreen from "../screens/logged_in/EditScreen";
import LogInScreen from '../screens/not_logged_in/LogInScreen';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PROFILE" component={ProfileScreen} />
            <Stack.Screen name="EDIT" component={EditScreen} />
        </Stack.Navigator>
    )
}

function ChatNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DASHBOARD" component={DashboardScreen} />
            <Stack.Screen name="BOARD" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default function Navigation() {

    const user = useSelector((state: RootState) => state.user.loggedInUser);

    return (
        <NavigationContainer>
            {user !== null ? (
                // This is for when the user is logged in.
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={ProfileNavigator} />
                    <Tab.Screen name="boards" component={ChatNavigator} />
                </Tab.Navigator>
            ) : (
                // This is when the user is not logged in yet.
                <Tab.Navigator>
                    <Stack.Screen name="LOGIN" component={LogInScreen} />
                    <Stack.Screen name="SIGNUP" component={SignUpScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}