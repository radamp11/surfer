import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import TwitterPost from "../twitterPost/TwitterPost";


export default function PostsList({ postsData }) {
    return postsData !== undefined && postsData !== null && postsData !== {}?
        <FlatList 
            style={styles.list}
            data={postsData.data}
            renderItem={({item}) => (
                <TwitterPost post={item}/>
            )}>
            </FlatList> 
        :
        <View style={styles.emptyView}>
            <Text style={styles.emptyText}>Search for some posts!</Text>
        </View>
        
}

const styles = StyleSheet.create({
    list: {
        marginRight: 5,
        marginTop: 5,
        backgroundColor: '#F9FEFF'
    },
    emptyView: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '82.8%',
        backgroundColor: '#F9FEFF'
    },
    emptyText: {
        fontSize: 30,
        fontFamily: 'sans-serif-light',
        alignSelf: 'center'
    }
})