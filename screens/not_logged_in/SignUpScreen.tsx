//import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/actions/user.actions';
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { emailIsValid } from "../../services/ExceptionHandler";
import Input from '../../components/Input';
import { ErrorTypes } from '../../entities/ErrorTypes';

export default function SignUpScreen() {
    
    const [email, setEmail] = useState("");
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
    
    const create = function() { if (emailIsValid(email)) {dispatch(signup(email,password));}} 

    return (
        <View style={style.container}>
            <Text>Type in the informations, in order to sign up:</Text>

            <Input placeholder="E-mail..." 
                    input={email} 
                    set={setEmail}
                    error={ErrorTypes.Cannot_Be_Empty}
            />

            <Input placeholder="Password..." 
                    input={password} 
                    set={setPassword}
                    error={ErrorTypes.Cannot_Be_Empty}
                    isSecureTextEntry={true}
            />

            <Button title="SIGN UP" onPress={create} color="green"/>
        </View>
    )
}