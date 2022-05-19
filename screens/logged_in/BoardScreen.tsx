import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../store/actions/board.action";
import React, { useState } from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "BOARD"
>

export default function ChatScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={style.container}>
            
            <FlatList 
                data={useSelector((state: any) => state.board.messages)}
                renderItem={function({item}: {item:Message}) { return (
                    <>
                        <Text>{item.timestamp}</Text>
                        <Text>{item.content}</Text>
                    </>
                )
                }}
            />

            <TextInput 
                onChangeText={setContent}
                value={content}
                placeholder="Message..."
            />

            <Button title="WRITE MESSAGE" onPress={function() {
                dispatch(addMessage(new Message(content)))}
            } />

            <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD")}}/>
        </View>
    );
}
