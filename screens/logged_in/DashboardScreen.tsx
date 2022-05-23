import { FlatList, View, Text, TextInput, StyleSheet, Button, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addBoard, fetchBoards } from "../../store/actions/dashboard.actions";
import { Board } from "../../entities/Board";
import React, { useEffect } from "react";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchBoard as fetchBoard } from "../../store/actions/board.action";
import { ErrorType } from "../../entities/ErrorType";
import Input from "../../components/Input";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "DASHBOARD"
>

export default function DashboardScreen() {
    
    useEffect(() => { dispatch(fetchBoards()) }, []);

    const navigation = useNavigation<ScreenNavigationType>();

    const user = useSelector((state: any) => state.user.loggedInUser);
    const allBoards = useSelector((state: any) => state.dashboard.boards);

    // Methods for filtering boards
    const generatePublicBoards = function() {
        const boards = allBoards.forEach((board: { isPublic: boolean; }) => {
            if (board.isPublic) {return board;}
        });
        return boards;
    }
    const generateUserBoards = function() {
        const boards = allBoards.forEach((board: { user: any; }) => {
            if (board.user ===  user) {return board;}
        });
        console.log(boards);
        return boards;
    }

    // Values for creating a new board
    const [title, changeTitle] = React.useState("");
    const [showAllBoards, setShowAllBoards] = React.useState(false);
    const [isPublic, setIsPublic] = React.useState(false);

    const publicButtonTitle = function () {
        if (isPublic) {return "PUBLIC";}
        else {return "PRIVATE";}
    }

    const dispatch = useDispatch();

    return (
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    {showAllBoards ? ( 
                        <View style={styles.innerContainer}>
                            <Text>Public boards</Text>
                            <Button title="SHOW ONLY MY BOARDS" onPress={() => setShowAllBoards(false)} />
                            
                            <FlatList 
                                data={generatePublicBoards()}
                                renderItem={function({item}: {item: Board}) {
                                    return <Button title={item.title} onPress={function() {
                                        fetchBoard(item);
                                        navigation.navigate("BOARD")}
                                        } />
                                    }
                                }
                                keyExtractor={item => item.title}
                            />
                        </View> 
                        
                        ) : (
                    
                        <View style={styles.innerContainer}>
                            <Text>Your boards</Text>
                            <Button title="SHOW ALL BOARDS" onPress={() => setShowAllBoards(true)} />

                            <FlatList 
                                data={generateUserBoards()}
                                renderItem={function({item}: {item: Board}) {
                                    return <Button title={item.title} onPress={function() {
                                        fetchBoard(item);
                                        navigation.navigate("BOARD")}
                                        } />
                                    }
                                }
                                keyExtractor={item => item.title}
                            />
                        </View>
                    )}

                    <View style={styles.innerContainer}>
                        <Text>Create a board</Text>
                        <Input 
                            placeholder={"Write board title..."}
                            input={title}
                            set={changeTitle}
                            error={ErrorType.Cannot_Be_Empty}
                        />
                        <Button title={publicButtonTitle()} onPress={
                            function() {
                                if (isPublic) {setIsPublic(false)}
                                else {setIsPublic(true);}
                            } 
                        }/>
                        <Button title="Create board" onPress={function() {
                            if (title != "") {
                                console.log("User in board",user)
                                dispatch(addBoard(new Board(title,[],user,isPublic),allBoards));}}
                        } color="green" />
                    </View>
                </View>
            </ImageBackground> 
        </View>
    )
}
