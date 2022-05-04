import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { Chatroom } from "../entities/Chatroom";
import React from "react";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

export default function DashboardScreen() {

    const [title, onChangeTitle] = React.useState('');
    const dispatch = useDispatch();
    
    return (
        <View style={style.container}>
            <Text>Your chatrooms</Text>
            
            <FlatList 
                data={useSelector((state: any) => state.chat.chatrooms)}
                renderItem={renderChatroom}
                keyExtractor={item => item.getTitle()}
            /> 

            <TextInput 
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Write chatroom title..."
            />
            <Button title="Create chatroom" onPress={function() {dispatch(addChatroom(new Chatroom(title)));}}/>
        </View>
    )
}

function renderChatroom({item}: {item:any}) {
    return <Text>{item.getTitle}</Text>
}