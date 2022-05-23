import React, { useState } from "react";
import { View, Text, Button, ImageBackground} from "react-native";
import { useSelector } from "react-redux";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { RootState } from "../../App";
import { StackParamList } from "../../typings/navigations";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../entities/User";
import { logout } from "../../store/actions/user.actions";
//import { logout } from "../../store/actions/user.actions";

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "PROFILE"
>

export default function ProfileScreen() {

    const navigation = useNavigation<ScreenNavigationType>();
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);

    return (
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    {!user.displayName === undefined ? (
                        <><Text>Welcome {user.displayName}</Text>
                        <Text>Your details are:</Text
                        ><Text>Email - {user.email}</Text></>
                    ) : (
                        <Text>This is your profilepage, please press edit in order to set up your profile</Text>
                    )}

                    <View style={styles.innerContainer}>
                        <Button title="EDIT" onPress={function() {navigation.navigate("EDIT")}} color="grey"/>
                        <Button title="SIGN OUT" onPress={logout} color="red" />
                    </View>
                
                </View>
            </ImageBackground>
        </View>
    );
}
