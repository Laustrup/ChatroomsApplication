import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom } from "../../store/actions/chatroom.actions";
import { Chatroom } from "../../entities/Chatroom";
import React from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

export default function ChatScreen() {


    return (
        <View style={style.container}>
            
            

            <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD")}}/>
        </View>
    );
}