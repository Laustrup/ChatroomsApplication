import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addBoard } from "../../store/actions/dashboard.actions";
import { Board } from "../../entities/Board";
import React from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../entities/User";
import { RootState } from "../../App";
import { get } from "../../store/actions/user.actions";
import { fetchChatroom as fetchBoard } from "../../store/actions/board.action";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "DASHBOARD"
>

export default function DashboardScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const [title, changeTitle] = React.useState("");
    const [email, setEmail] = React.useState("");

    const dispatch = useDispatch();
    
    return (
        <View style={style.container}>
            <Text>Your boards</Text>
            
            <FlatList 
                data={useSelector((state: any) => state.dashboard.boards)}
                renderItem={function({item}: {item:any}) {
                    return <Button title={item.getTitle} onPress={function() {
                        // TODO get Index of current board
                        fetchBoard(1);
                        navigation.navigate("BOARD")}
                    } />
                    }
                }
                keyExtractor={item => item.title}
            /> 
            
            <TextInput 
                onChangeText={changeTitle}
                value={title}
                placeholder="Write board title..."
            />

            <Button title="Create board" onPress={function() {
                dispatch(addBoard(new Board(title,[])));}
            }/>
        </View>
    )
}
