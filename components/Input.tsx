import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { style } from '../ressources.styles.stylesheets/GlobalStyle';

const Input = ({title, input, error, set}:
    {title: string, input: string, error: string, set: (i: string) => void}) => {

    const [entered, isEntered] = useState(false);

    const handleText = function(input: string) {
        set(input);
        isEntered(true);
    }

    return (
        <View style={style.container}>
            <Text>{title}</Text>
            <TextInput value={input} onChangeText={handleText}
            onBlur={ function() { isEntered(true) }} />
            {input === "" && entered ? <Text>{error}</Text> : <></>}
        </View>
    );
}

export default Input;