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
import { edit, signup } from '../../store/actions/user.actions';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "EDIT"
>

export default function EditScreen() {
    const navigation = useNavigation<ScreenNavigationType>();
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    // Variables used in this function
    const [email, setEmail] = useState(user.email);
    const [title, setTitle] = useState(user.getTitle());
    const [password, setPassword] = useState(user.getPassword());
    
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
                    if (user.email != null) { edit(new User(email,title,password)); } 
                    else { console.log("User is not logged in, therefore user can't be edited..."); }
                } 
            } />

            <Button title="GO BACK" onPress={
                function() {
                    navigation.navigate("CHAT");} 
                } />
        </View>
    )

}