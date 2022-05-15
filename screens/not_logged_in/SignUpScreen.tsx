//import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { rehydrateUser, signup, login } from '../../store/actions/user.actions';
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import emailIsValid from "../../services/ExceptionHandler";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../typings/navigations';

export default function SignUpScreen() {
    
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    /*
    useEffect(() => {
        async function readPersistedUserInfo() {
            const token = await SecureStore.getItemAsync("idToken");
            const userJson = await SecureStore.getItemAsync("user");
    
            let user = null;
    
            if (userJson) {user = JSON.parse(userJson);}
            if (user) {dispatch(rehydrateUser(user, token!))}
        }
    }, [])
    */
    
    const create = function() { if (emailIsValid(email)) {dispatch(signup(email,title,password));}} 

    return (
        <View style={style.container}>
            <Text>Type the informations, in order to sign up:</Text>
            <TextInput value={title} placeholder="Type a title..." onChangeText={setTitle} />
            <TextInput value={password} placeholder="Type a password..." onChangeText={setPassword} secureTextEntry />
            <TextInput value={email} placeholder="Type an email..." onChangeText={setEmail} />

            <Button title="SIGN UP" onPress={create} />
        </View>
    )
}