import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function SearchButton({ setSearchModalVisible }) {

    const handlePress = () => {
        setSearchModalVisible(true)
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View >
                <Icon style={styles.icon} size={30} name="search">
                </Icon>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FEFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E9F2F2',
    },
    icon: {
        color: '#2DB9E5',
        alignSelf: 'center'
    },
})