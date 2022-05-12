import React, { useState } from "react";
import { View, Text, Button} from "react-native";
import { useSelector } from "react-redux";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { RootState } from "../../App";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../entities/User";
import { logout } from "../../store/actions/user.actions";

export default function ProfileScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [title] = useState(user.title);
    const [email] = useState(user.email);

    return (
        <View style={style.container}>
            <Text>Welcome {title}</Text>

            <Text>Your details are:</Text>
            <Text>Email - {email}</Text>

            <Button title="EDIT" onPress={function() {navigation.navigate("EDIT")}}/>
            <Button title="SIGN OUT" onPress={logout} />
        </View>
    );
}
