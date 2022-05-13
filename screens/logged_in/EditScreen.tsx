import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { User } from '../../entities/User';
import Input from "../../components/Input";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from '../../typings/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function EditScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    // Variables used in this function
    const [email, setEmail] = useState(user.email);
    const [title, setTitle] = useState(user.getTitle());
    const [password, setPassword] = useState(user.getPassword());
    
    // TODO
    const onSave = function() {
        if (user.email != null && user.password != null) {

        } 
        else {
            console.log();
        }
    }

    return (
        <View style={style.container}>
            <Text>Edit</Text>
            <Input title="Email:" 
                    input={email} 
                    set={setEmail}
                    error="Email cannot be empty..." 
            />
            <Input title="Title:" 
                    input={title} 
                    set={setTitle}
                    error="Title cannot be empty..." 
            />           
            <Input title="Password:" 
                    input={password} 
                    set={setPassword}
                    error="Password cannot be empty..." 
            />
            <Button title="Change" onPress={
                function() {
                onSave();
                console.log("Change in edit is pressed!");}
                } />

            <Button title="GO BACK" onPress={
                function() {
                    useNavigation<NativeStackNavigationProp<StackParamList,"EDIT">>().navigate("CHAT");} 
                } />
        </View>
    )

}