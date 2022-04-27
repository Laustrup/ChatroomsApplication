import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, signup } from '../store/actions/user.actions';
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

export default function SignUpScreen() {

    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        async function readPersistedUserInfo() {
            const token = await SecureStore.getItemAsync("idToken");
            const userJson = await SecureStore.getItemAsync("user");
    
            let user = null;
    
            if (userJson) {user = JSON.parse(userJson);}
            if (user) {dispatch(rehydrateUser(user, token!))}
        }
    }, [])

    return (
        <View style={style.container}>
            <Text>Sign up</Text>
            <TextInput value={title} placeholder="Type your title..." onChangeText={setTitle} />
            <TextInput value={password} placeholder="Type a password..." onChangeText={setPassword} secureTextEntry />
            <TextInput value={email} placeholder="Type your email..." onChangeText={setEmail} />

            <Button title="Sign up" onPress={() => dispatch(signup(email,title,password))} />
        </View>
    )
}