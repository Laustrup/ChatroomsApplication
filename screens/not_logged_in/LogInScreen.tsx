import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import { ErrorTypes } from "../../entities/ErrorTypes";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { login } from "../../store/actions/user.actions";
import { StackParamList } from "../../typings/navigations";

export default function IntroductionScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            <Text>UNBORED BOARDS</Text>

            <Input placeholder="E-mail..." 
                    input={email} 
                    set={setEmail}
                    error={ErrorTypes.Login_Not_Accepted}
            />
            <Input placeholder="Password..." 
                    input={password} 
                    set={setPassword}
                    error={ErrorTypes.Login_Not_Accepted}
                    isSecureTextEntry={true}
            />

            <Button title="LOGIN"
                    onPress={function() {dispatch(login(email,password))}}
                    color="green" />
        </View>
    )
}