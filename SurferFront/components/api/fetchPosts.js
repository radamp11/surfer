import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const serverUrl = 'http://10.0.2.2:8080/'
const twitterPosts = 'tweets/getposts/'

export default async function fetchPosts(parameters) {
    
    let data = await fetch(serverUrl+twitterPosts, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    })
    .then(res => {
        if(res.ok) {
            console.log('RESP ok: ', res);
        }
    })
    .catch(error => {
        console.error('ERROR in fetching posts: ', error);
    })
    return data;
    
}