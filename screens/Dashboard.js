import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { api } from '../utils/api';

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
  }
});

export default function Dashboard(props) {
  const { userInfo } = props.route.params
  const navigation = useNavigation();

  const makeBackground = (btn) => {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  const goToProfile = () => navigation.navigate('Profile', { userInfo })

  const goToNotes = () => api.getNotes(userInfo.login).then(res =>
    navigation.navigate('Notes', {
      userInfo,
      notes: res || {}
    })
  );

  const goToRepos = () =>
    api.getRepos(userInfo.login).then(res =>
      navigation.navigate('Repos', {
        userInfo,
        repos: res
      })
    );

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: userInfo.avatar_url }}
        style={styles.image}
      />

      <TouchableHighlight
        style={makeBackground(0)}
        onPress={goToProfile}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Profile </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={makeBackground(1)}
        onPress={goToRepos}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Repos </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={makeBackground(2)}
        onPress={goToNotes}
        underlayColor="#88D45F"
      >
        <Text style={styles.buttonText}> View Notes </Text>
      </TouchableHighlight>
    </View>
  );
}
