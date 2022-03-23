import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { StackParamList } from "../typings/navigations";
import { Chatroom } from "../entities/Chatroom";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "chatroomScreen"
>

export default function ChatroomScreen() {

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})