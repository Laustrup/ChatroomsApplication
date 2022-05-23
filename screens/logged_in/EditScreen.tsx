import React, { useState } from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { User } from '../../entities/User';
import Input from "../../components/Input";
import { backgroundImage, styles } from "../../ressources/styles/sheets/GlobalStyle";
import { StackParamList } from '../../typings/navigations';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { edit, deleteAccount } from '../../store/actions/user.actions';
import { ErrorType } from '../../entities/ErrorType';

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
        <View style={styles.backgroundContainer}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    <Text>Edit</Text>

                    {/* <Input title="Email:" 
                            input={email} 
                            set={setEmail}
                            error="Email cannot be empty..." 
                    /> */}
                    <Input title="Display name:" 
                            input={displayName} 
                            set={setDisplayName}
                            error={ErrorType.Cannot_Be_Empty}
                    />

                    <View style={styles.innerContainer}>
                        <Button title="CHANGE" onPress={function () { edit(new User(email, displayName)); } } color="green" />
                        <Button title="GO BACK" onPress={function () { navigation.navigate("PROFILE"); } } color="grey" />
                        <Button title="DELETE PROFILE" onPress={deleteAccount(user)} color="red" />
                    </View>

                </View>
            </ImageBackground>
        </View>
    )

}