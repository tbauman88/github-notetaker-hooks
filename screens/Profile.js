import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import Separator from '../components/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

export default function Profile({ route }) {
  const { userInfo } = route.params

  const getRowTitle = item => {
    const newItem = item === 'public_repos' ? item.replace('_', ' ') : item;
    return newItem[0] ? newItem[0].toUpperCase() + newItem.slice(1) : newItem;
  };

  const topicArr = [
    'company',
    'location',
    'followers',
    'following',
    'email',
    'bio',
    'public_repos'
  ];

  const list = topicArr.map((item, index) => {
    if (!userInfo[item]) {
      return <View key={index} />;
    } else {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}> {getRowTitle(item)} </Text>
            <Text style={styles.rowContent}> {userInfo[item]} </Text>
          </View>
          <Separator />
        </View>
      );
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Badge userInfo={userInfo} />
      {list}
    </ScrollView>
  );
}
