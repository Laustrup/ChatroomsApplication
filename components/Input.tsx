import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { ErrorTypes } from '../entities/ErrorTypes';
import { style } from '../ressources.styles.stylesheets/GlobalStyle';

const Input = ({title, input, error, set, isSecureTextEntry, placeholder}:
    {title?: string, input: string | undefined, error?: ErrorTypes, errorMessage?: string,
        set: (i: string) => void, isSecureTextEntry?: boolean, placeholder?: string}) => {

    if (placeholder==undefined) {placeholder="";}

    const [entered, isEntered] = useState(false);

    const handleText = function(input: string) {
        set(input);
        isEntered(true);
    }

    return (
        <>
            <Text>{title}</Text>
            {!isSecureTextEntry || isSecureTextEntry == undefined ? (
                <TextInput
                value={input}
                onChangeText={handleText}
                onBlur={ function() { isEntered(true) }}
                placeholder={placeholder}
                style={style.input} />
            ) : (
                <TextInput
                value={input}
                onChangeText={handleText}
                onBlur={ function() { isEntered(true) }}
                placeholder={placeholder}
                style={style.input}
                secureTextEntry />
                )
            }
            {error == ErrorTypes.Cannot_Be_Empty && input === "" && entered ? <Text>{error}</Text> : <></>}
            
            {/* TODO */}
            {error == ErrorTypes.Login_Not_Accepted && false ? <Text>{error}</Text> : <></>}
        </>

    );
}

export default Input;