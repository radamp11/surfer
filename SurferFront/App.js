import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/header/header';
import PostsList from './components/postsList/postsList';
import SearchButton from './components/search/searchButton';
import SearchPopup from './components/search/searchPopup';
import fetchPosts from './components/api/fetchPosts';


// flat list for list scrolling view

export default function App() {

  const serverUrl = 'http://10.0.2.2:8080/'
  const twitterPosts = 'tweets/getposts/'

  const jsonData = require('./mocks/example_response.json');

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [postsData, setPostsData] = useState();
  const [query, setQuery] = useState();

  function getNewPosts(queryParameters) {
    setQuery(queryParameters)
  };

  useEffect(() => {
    if(query !== undefined && query !== {}) {
      console.log('fetching posts with query: ', query);
        fetch(serverUrl+twitterPosts, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(query)
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
        })
        .then(data => setPostsData(data))
        .catch(error => {
            console.error('ERROR in fetching posts: ', error);
        });
      }
    }, [query]);

  return (
    <View style={styles.appContainer}>
      <StatusBar style={styles.statusbar} />
      <Header />
      <PostsList postsData={postsData}/>
      <SearchButton setSearchModalVisible={setSearchModalVisible} />
      <SearchPopup isVisible={searchModalVisible} setModalVisible={setSearchModalVisible} getNewPosts={getNewPosts}/>
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: {

  },
  appContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FEFF'
  },
});
