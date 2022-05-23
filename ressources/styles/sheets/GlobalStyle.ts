import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    // Containers
    innerContainer: {
        // Centering and flex
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // Sizes
        margin: 100,
        height: "auto",
        width: "fit-content",

        minWidth: "1",
        maxWidth: "5",
        minHeight: "5",
        maxheigth: "10",
  
    },
    contentContainer: {
        // Centering and flex
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // Sizes
        margin: "auto",
        marginVertical: 150, 
        width: "fit-content",

        // Border
        borderColor: '#7a42f4',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    backgroundContainer: {
        // Centering and flex
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        // Size
        margin: 15,
        height: 40,

        // Border
        borderColor: '#7a42f4',
        borderWidth: 1
    },

    // Images
    backgroundImage: {
        // Size
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').height,

        // Position
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export const backgroundImage = { uri: "https://reactjs.org/logo-og.png" };