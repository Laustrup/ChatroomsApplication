import { FlatList, View, Text, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, deleteBoard } from "../../store/actions/board.action";
import React, { useState } from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";
import { RootState } from "../../App";
import { ErrorTypes } from "../../entities/ErrorTypes";
import Input from "../../components/Input";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "BOARD"
>

export default function BoardScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const board = useSelector((state: RootState) => state.board.board);
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    return (
        <View style={style.container}>

            <Text>{board.title}</Text>

            <FlatList 
                data={board.messages}
                renderItem={function({item}: {item:Message}) { return (
                    <>
                        <Text>{item.timestamp}</Text>
                        <Text>{item.content}</Text>
                    </>
                )
                }}
            />

            <Input 
                placeholder={"Coneten..."}
                input={content}
                set={setContent}
                error={ErrorTypes.Cannot_Be_Empty}
            />

            <TextInput 
                onChangeText={setContent}
                value={content}
                placeholder="Message..."
            />

            <Button title="WRITE MESSAGE" onPress={function() {
                dispatch(addMessage(new Message(content)));}
            } color="green" />
            <Button title="DELETE BOARD" onPress={function() {
                deleteBoard(useSelector((state: any) => state.board.board));
                navigation.navigate("DASHBOARD");
                }
            } color="red" />
            <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD");}} color="grey"/>
        </View>
    );
}
