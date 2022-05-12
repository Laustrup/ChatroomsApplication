import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom } from "../../store/actions/chatroom.actions";
import { Chatroom } from "../../entities/Chatroom";
import React from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../entities/User";
import { RootState } from "../../App";
import { getUser } from "../../store/actions/user.actions";

const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

export default function DashboardScreen() {

    const [title, changeTitle] = React.useState("");

    const [email, setEmail] = React.useState("");

    const dispatch = useDispatch();
    
    return (
        <View style={style.container}>
            <Text>Your chatrooms</Text>
            
            <FlatList 
                data={useSelector((state: any) => state.chat.chatrooms)}
                renderItem={renderChatroom}
                keyExtractor={item => item.title}
            /> 
            
            <TextInput 
                onChangeText={changeTitle}
                value={title}
                placeholder="Write chatroom title..."
            />

            <TextInput 
                onChangeText={setEmail}
                value={email}
                placeholder="Enter email of other user..."
            />

            <Button title="Create chatroom" onPress={function() {
                dispatch(addChatroom(new Chatroom(title,[useSelector((state: RootState) => state.user.loggedInUser),getUser(email)])));}
                }/>
        </View>
    )
}

function renderChatroom({item}: {item:any}) { return <Button title={item.getTitle} onPress={function() {navigation.navigate("CHAT")}} />}
