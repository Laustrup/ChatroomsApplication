import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackParamList } from "../typings/navigations";
import { signup, login } from "../store/actions/user.actions";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

export default function ProfileScreen() {

    return (
        <View style={style.container}>
            <Text>Welcome</Text>
        </View>
    );
}
