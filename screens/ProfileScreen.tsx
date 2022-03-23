import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { StackParamList } from "../typings/navigations";
import { Chatroom } from "../entities/Chatroom";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "profileScreen"
>

export default function ProfileScreen() {

    const loggedInState = true;

    if (loggedInState===true) {
        userIsLoggedIn();
    }
    else {
        userIsNotLoggedIn();
    }

}

function userIsLoggedIn() {
    const navigation = useNavigation<ScreenNavigationType>();
    const [title] = React.useState('');

 
    const dispatch = useDispatch();

    const handleAddChatroom = function() {
        //TODO create add users 
        dispatch((addChatroom(new Chatroom(title))));
    }
    const renderChatroom = ({ item }: { item: any }) => (
        <Button title={item.title} onPress={() => navigation.navigate("")} />
    )

    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Button title="Create chatroom" onPress={handleAddChatroom} />
        </View>
    );
}

function userIsNotLoggedIn() {
        
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
