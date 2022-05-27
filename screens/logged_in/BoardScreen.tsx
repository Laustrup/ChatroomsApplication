import { FlatList, View, Text, TextInput, Button, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";
import { ErrorType } from "../../entities/ErrorType";
import Input from "../../components/Input";
import { addMessage, deleteBoard } from "../../store/actions/board.actions";
import { Board } from "../../entities/Board";
import { User } from "../../entities/User";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "BOARD"
>

export default function BoardScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const board: Board = useSelector((state: any) => state.board.currentBoard);
    const user: User = useSelector((state: any) => state.user.loggedInUser);

    const [content, setContent] = React.useState("");

    const dispatch = useDispatch();

    return (
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text>{board.title}</Text>
                        <Text>Created - {board.timestamp.toDateString()}</Text>
                    </View>

                    <View>
                        <FlatList 
                            data={board.messages}
                            renderItem={function({item}: {item:Message}) { return (
                                <View>
                                    <Text>Written - {() => item.timestamp.toDateString()}</Text>
                                    {item.author.displayName != undefined ? <Text>By - {item.author.displayName}</Text> : <></> }
                                    <Text>{item.content}</Text>
                                </View>
                            )
                            }}
                        />
                    </View>

                    <View>
                        <Input
                            placeholder={"Content..."}
                            input={content}
                            set={setContent}
                            error={ErrorType.Cannot_Be_Empty}
                        />
                        <Button title="WRITE MESSAGE" onPress={function() {
                            dispatch(addMessage(board,new Message(content,user)));}
                        } color="green" />
                        {board.author.idToken === user.idToken ? 
                            <Button title="DELETE BOARD" onPress={function() {
                                deleteBoard(board);
                                navigation.navigate("DASHBOARD");
                                }
                            } color="red" /> : <></>
                        }
                    </View>
                    
                    <Button title="DASHBOARD" onPress={function() {navigation.navigate("DASHBOARD");}} color="grey"/>
                </View>
            </ImageBackground>
        </View>
    );
}
