import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { ErrorType } from '../entities/ErrorType';
import { emailIsValid, passwordCheck } from "../services/ExceptionHandler";
import { styles } from '../ressources/styles/sheets/GlobalStyle';

const Input = ({title, input, error, set, isSecureTextEntry, placeholder}:
    {title?: string, input: string | undefined, error?: ErrorType,
        set: (i: string) => void, isSecureTextEntry?: boolean, placeholder?: string}) => {

    if (placeholder===undefined) {placeholder="";}
    if (input===undefined) {set("");}

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
                style={styles.input} />
            ) : (
                <TextInput
                value={input}
                onChangeText={handleText}
                onBlur={ function() { isEntered(true) }}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry />
                )
            }

            {error !== undefined && input!==undefined && entered ? (
                <>
                    {input === "" && ErrorType.Cannot_Be_Empty ? <Text>{error}</Text> : 
                        <>
                            {error == ErrorType.Password && !passwordCheck(input) ? <Text>{ErrorType.Password}</Text> : <></>}
                            {error == ErrorType.Email && !emailIsValid(input) ? <Text>{ErrorType.Email}</Text> : <></>}     
                        </>
                    }
                </> ) : (<></>)}
        </>

    );
}

export default Input;