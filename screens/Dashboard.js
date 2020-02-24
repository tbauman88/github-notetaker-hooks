import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  image: {
    height: 350
  },

  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },

  card: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  }
});

export default function Dashboard(props) {
  const { userInfo } = props.route.params
  const navigation = useNavigation();

  const goToProfile = () => navigation.navigate('Profile', { userInfo })

  const goToNotes = () => navigation.navigate('Notes', { userInfo });

  const goToRepos = () => navigation.navigate('Repos', { userInfo });

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: userInfo.avatar_url }}
        style={styles.image}
      />

      <TouchableHighlight
        style={styles.card}
        onPress={goToProfile}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Profile </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[styles.card, { backgroundColor: '#E77AAE' }]}
        onPress={goToRepos}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Repos </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[styles.card, { backgroundColor: '#758BF4' }]}
        onPress={goToNotes}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Notes </Text>
      </TouchableHighlight>
    </View>
  );
}
