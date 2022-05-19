import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { User } from '../../entities/User';
import Input from "../../components/Input";
import { style } from "../../ressources.styles.stylesheets/GlobalStyle";
import { StackParamList } from '../../typings/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { edit } from '../../store/actions/user.actions';
import { ErrorTypes } from '../../entities/ErrorTypes';

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "EDIT"
>

export default function EditScreen() {
    const navigation = useNavigation<ScreenNavigationType>();
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    // Variables used in this function

    const [email, setEmail] = useState(user.email);
    const [displayName, setDisplayName] = useState(user.displayName);

    if (displayName == undefined) {setDisplayName("");}

    return (
        <View style={style.container}>
            <Text>Edit</Text>

            {/* <Input title="Email:" 
                    input={email} 
                    set={setEmail}
                    error="Email cannot be empty..." 
            /> */}
            <Input title="Display name:" 
                    input={displayName} 
                    set={setDisplayName}
                    error={ErrorTypes.Cannot_Be_Empty}
            />
            
            <><Button title="CHANGE" onPress={function () { edit(new User(email, displayName)); } } color="green" />
            <Button title="GO BACK" onPress={function () { navigation.navigate("PROFILE"); } } color="grey" /></>
        </View>
    )

}