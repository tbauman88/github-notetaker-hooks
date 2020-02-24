import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Badge from '../components/Badge';
import Separator from '../components/Separator';
import { api } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

export default function Repos({ route }) {
  const { userInfo } = route.params;
  const [repos, setRepos] = useState([])


  useEffect(() => {
    async function getRepos() {
      let userRepos = await api.getRepos(userInfo.login)
      setRepos(userRepos)
    }
    getRepos()
  }, [userInfo])

  const list = repos.map(repo => {
    return (
      <View key={repo.id}>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            onPress={() =>
              WebBrowser.openBrowserAsync(repo.html_url)
            }
            underlayColor="transparent"
          >
            <Text style={styles.name}>{repo.name}</Text>
          </TouchableHighlight>

          <Text style={styles.stars}>
            Stars: {repo.stargazers_count}
          </Text>

          {repo.description && <Text style={styles.description}>{repo.description}</Text>}
        </View>
        <Separator />
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Badge userInfo={userInfo} />
      {list}
    </ScrollView>
  );

}
