import { FlatList, View, Text, TextInput, Button, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, deleteBoard } from "../../store/actions/board.action";
import React from "react";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Message } from "../../entities/Message";
import { RootState } from "../../App";
import { ErrorType } from "../../entities/ErrorType";
import Input from "../../components/Input";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "BOARD"
>

export default function BoardScreen() {

    const navigation = useNavigation<ScreenNavigationType>();

    const board = useSelector((state: any) => state.board.board);
    const user = useSelector((state: any) => state.user.loggedInUser);
    const [content, setContent] = React.useState("");

    const dispatch = useDispatch();

    return (
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
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

                    <View style={styles.innerContainer}>
                        <Input
                            placeholder={"Content..."}
                            input={content}
                            set={setContent}
                            error={ErrorType.Cannot_Be_Empty}
                        />
                        <Button title="WRITE MESSAGE" onPress={function() {
                            dispatch(addMessage(new Message(content,user)));}
                        } color="green" />
                        {board.user === user ? 
                            <Button title="DELETE BOARD" onPress={function() {
                                deleteBoard(useSelector((state: any) => state.board.board));
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
