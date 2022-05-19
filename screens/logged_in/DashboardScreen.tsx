import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addBoard, fetchBoards } from "../../store/actions/dashboard.actions";
import { Board } from "../../entities/Board";
import React, { useEffect } from "react";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchBoard as fetchBoard } from "../../store/actions/board.action";
import { ErrorTypes } from "../../entities/ErrorTypes";
import Input from "../../components/Input";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "DASHBOARD"
>

export default function DashboardScreen() {
    
    const navigation = useNavigation<ScreenNavigationType>();

    const boards = useSelector((state: any) => state.dashboard.boards);

    const [title, changeTitle] = React.useState("");

    const dispatch = useDispatch();
    
    useEffect(() => { dispatch(fetchBoards()) }, [])

    return (
        <View style={style.container}>
            <Text>Your boards</Text>
            
            <FlatList 
                data={useSelector((state: any) => state.dashboard.boards)}
                renderItem={function({item}: {item: Board}) {
                    return <Button title={item.title} onPress={function() {
                        fetchBoard(item);
                        navigation.navigate("BOARD")}
                        } />
                    }
                }
                keyExtractor={item => item.title}
            /> 
            
            <Input 
                placeholder={"Write board title..."}
                input={title}
                set={changeTitle}
                error={ErrorTypes.Cannot_Be_Empty}
            />

            <Button title="Create board" onPress={function() {
                dispatch(addBoard(new Board(title,[],boards.length+1)));}
            } color="green" />
        </View>
    )
}
