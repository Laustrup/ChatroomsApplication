import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import { ErrorType } from "../../entities/ErrorType";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { userExists } from "../../services/ExceptionHandler";
import { login } from "../../store/actions/user.actions";

export default function IntroductionScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            <Text>UNBORED BOARDS</Text>

            <Input placeholder="E-mail..." 
                    input={email} 
                    set={setEmail}
                    error={ErrorType.Email}
            />
            <Input placeholder="Password..." 
                    input={password} 
                    set={setPassword}
                    error={ErrorType.Password}
                    isSecureTextEntry={true}
            />

            <Button title="LOGIN"
                    onPress={ async function() { if (await userExists(email, password) === true) {
                        dispatch(login(email,password))} 
                        else {  setErrorMessage(ErrorType.Login_Not_Accepted);}
                        ;} }
                    color="green" />

            {errorMessage === ErrorType.Login_Not_Accepted ? <Text>{errorMessage}</Text> : <></>}
        </View>
    )
}