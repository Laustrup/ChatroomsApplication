import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, View } from "react-native";
import { StackParamList } from "../typings/navigations";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "chatroomScreen"
>

export default function ChatroomScreen() {
    return (
        <View style={styles.container}>
            
            <FlatList data={chatroom}/>

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