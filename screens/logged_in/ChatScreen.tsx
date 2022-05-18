import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../store/actions/chatroom.action";
import { Chatroom } from "../../entities/Chatroom";
import React, { useState } from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";
import { RootState } from "../../App";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "CHAT"
>

export default function ChatScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            
            <FlatList 
                data={useSelector((state: any) => state.chat.chatrooms[state.chat.chatIndex])}
                renderItem={renderMessage} 
            />

            <TextInput 
                onChangeText={setContent}
                value={content}
                placeholder="Message..."
            />

            <Button title="WRITE MESSAGE" onPress={function() {
                dispatch(addMessage(new Message(useSelector((state: RootState) => state.user.loggedInUser),content)))}
            } />

            <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD")}}/>
        </View>
    );
}

const renderMessage = ({item}: {item:Message}) => (
    
    <>
    <Text>Written by {item.author}</Text>
    <Text>{item.timestamp}</Text>
    <Text>{item.content}</Text>
    {item.isMessageRead() === true ? (
        <Text>Read</Text>
    ) : (
        <Text>unRead</Text>
    )}
    </>

)