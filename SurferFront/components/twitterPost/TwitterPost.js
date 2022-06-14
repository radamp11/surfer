import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";


const TwitterPost = ({post}) => {
    return (
        <View style={styles.twitterPost}>
            <Text style={styles.text}>{post.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    twitterPost: {
        backgroundColor: '#CFEAF7',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 5,
        marginVertical: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    text: {
        fontSize: 20,
    },
})

export default TwitterPost;