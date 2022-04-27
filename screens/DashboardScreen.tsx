import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { StackParamList } from "../typings/navigations";
import { Chatroom } from "../entities/Chatroom";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

type ScreenNavigationType = NativeStackNavigationProp<StackParamList,"Dashboard">

export default function ChatroomScreen() {

    const navigation = useNavigation<ScreenNavigationType>();
    const [title, onChangeTitle] = React.useState('');

    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms);

    const dispatch = useDispatch();
    
    return (
        <View style={style.container}>
            <Text>Your chatrooms</Text>
            
            <FlatList 
                data={chatrooms}
                renderItem={renderChatroom}
                keyExtractor={item => item.getTitle()}
            /> 

            <TextInput 
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Chatroom title"
            />

            <Button title="Create chatroom" onPress={function() {dispatch(addChatroom(new Chatroom(title)));}}/>
        </View>
    )
}

function renderChatroom({item}: {item:any}) {
    return <Text>{item.getTitle}</Text>
}