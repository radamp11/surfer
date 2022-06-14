import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>surfer</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#44D4D2',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
    },
    header: {
        backgroundColor: '#E9F2F2',
        width: '100%',
        height: 50,
        marginTop: 35,
    },
})