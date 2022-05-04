import { FlatList, View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addChatroom } from "../store/actions/chatroom.actions";
import { Chatroom } from "../entities/Chatroom";
import React from "react";
import { style } from "../ressources.styles.stylesheets/GlobalStyle";

// This is a screen to show each message.