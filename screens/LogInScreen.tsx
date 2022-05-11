import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";
import { login } from "../store/actions/user.actions";
import { StackParamList } from "../typings/navigations";

export default function IntroductionScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList,"LOGIN">>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            <Text>Welcome to Shout!</Text>

            <TextInput value={email} placeholder="Type your email..." onChangeText={setEmail} />
            <TextInput value={password} placeholder="Type your password" onChangeText={setPassword} secureTextEntry />

            <Button title="LOGIN" onPress={function() {dispatch(login(email,password))}} />
            <Button title="REGISTER" onPress={function() {navigation.navigate("SIGNUP")}} />
        </View>
    )
}