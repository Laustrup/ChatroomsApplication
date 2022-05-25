import { FlatList, View, Text, Button, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addBoard, fetchBoard, fetchBoards } from "../../store/actions/board.actions";
import { Board } from "../../entities/Board";
import React, { useEffect } from "react";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ErrorType } from "../../entities/ErrorType";
import Input from "../../components/Input";
import { publicBoards, userBoards } from "../../services/BoardService";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "DASHBOARD"
>

export default function DashboardScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const user = useSelector((state: any) => state.user.loggedInUser);
    const allBoards = useSelector((state: any) => state.board.boards);

    console.log("Boards",allBoards)

    // Values for creating a new board
    const [title, changeTitle] = React.useState("");
    const [showAllBoards, setShowAllBoards] = React.useState(true);
    const [isPublic, setIsPublic] = React.useState(false);

    useEffect(() => { dispatch(fetchBoards()) }, []);

    const publicButtonTitle = function () {
        if (isPublic) {return "PUBLIC";}
        else {return "PRIVATE";}
    }

    const renderedItem = function({item}: {item: any}) { 
        return (<Button title={item.title} onPress={function() {
            fetchBoard(item);
            navigation.navigate("BOARD")}
            } />);
    }
    
    const dispatch = useDispatch();

    return (
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    {showAllBoards ? ( 
                        <View>
                            <Text>Public boards</Text>
                            
                            <FlatList 
                                data={publicBoards(allBoards)}
                                renderItem={renderedItem}
                                keyExtractor={item => item.id}
                            />

                            <Button title="SHOW ONLY MY BOARDS" onPress={() => setShowAllBoards(false)} color="grey" />
                        </View> 
                        
                        ) : (
                    
                        <View>
                            <Text>Your boards</Text>

                            <FlatList 
                                data={userBoards(allBoards,user)}
                                renderItem={renderedItem}
                                keyExtractor={item => item.id}
                            />

                            <Button title="SHOW ALL BOARDS" onPress={() => setShowAllBoards(true)} color="grey" />
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
                                dispatch(addBoard(new Board(title,[],user,isPublic,""),allBoards));}}
                        } color="green" />
                    </View>
                </View>
            </ImageBackground> 
        </View>
    )
}
