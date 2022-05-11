import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import { User } from '../entities/User';
import Input from "../components/Input";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

export default function EditScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    // Variables used in this function
    const [email, setEmail] = useState(user.email);
    const [title, setTitle] = useState(user.title);
    const [password, setPassword] = useState(user.password);
    
    // TODO
    const onSave = function() {
        if (user.email != null && user.password != null) {

        } else {
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
            {/* <Input title="Title:" 
                    input={title} 
                    set={setTitle}
                    error="Title cannot be empty..." 
            />
            */}
            {/*<Input title="Password:" 
                    input={password} 
                    set={setPassword}
                    error="Password cannot be empty..." 
            />*/}
            <Button title="Change" onPress={
                function() {
                console.log("Change in edit is pressed!")}
                } />
        </View>
    )

}