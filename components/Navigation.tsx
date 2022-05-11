import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { StackParamList } from "./../typings/navigations";
import { RootState } from '../App';
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import EditScreen from "../screens/EditScreen";
import LogInScreen from '../screens/LogInScreen';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
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
                    <Tab.Screen name="Chats" component={DashboardScreen} />
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