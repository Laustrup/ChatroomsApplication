import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../store/actions/dashboard.actions";
import { Chatroom } from "../../entities/Chatroom";
import React, { useState } from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";
import { RootState } from "../../App";

const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

export default function ChatScreen() {

    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            
            <FlatList 
                data={useSelector((state: any) => state.chat.chatrooms)}
                renderItem={function renderChatroom({item}: {item:any}) {
                    return <Button title={item.getTitle} onPress={function() {navigation.navigate("CHAT")}} />}
                }
                keyExtractor={item => item.title}
            />

            <TextInput 
                onChangeText={setContent}
                value={content}
                placeholder="Enter email of other user..."
            />

            <Button title="WRITE MESSAGE" onPress={function() {
                dispatch(addMessage(new Message(useSelector((state: RootState) => state.user.loggedInUser),content)))}
            } />

            <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD")}}/>
        </View>
    );
}