import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { StackParamList } from "../typings/navigations";
import { Chatroom } from "../entities/Chatroom";
import { signup, login } from "../store/actions/user.actions";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Profile"
>

export default function ProfileScreen() {

    const loggedInState = true;

    if (loggedInState===true) {return userIsLoggedIn();}
    else {return userIsNotLoggedIn();}

}

function userIsLoggedIn() {

    return (
        <View style={style.container}>
            <Text>Welcome</Text>
        </View>
    );
}

function userIsNotLoggedIn() {

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    return (
        <View style={style.container}>

            <TextInput value={title} placeholder="title" onChangeText={setTitle} />
            <TextInput value={password} placeholder="password" onChangeText={setPassword} />
            <TextInput value={email} placeholder="email" onChangeText={setEmail} />

            <Button title="Login" onPress={function() {dispatch(login(email,password));}} />
            <Button title="Signup" onPress={function() {dispatch(signup(email,title,password));}} />
        </View>
    )
}