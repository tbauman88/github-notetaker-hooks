import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useReducer } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { api } from '../utils/api';

function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  )
}

const initialState = {
  username: '',
  isLoading: false,
  error: false
}

export default function Search() {
  const [state, setState] = useSetState(initialState)

  const showError = state.error && <Text>{state.error}</Text>;

  const handleInputChange = e => {
    setState({ username: e.nativeEvent.text })
  }

  const navigation = useNavigation();

  const handleSubmit = () => {
    setState({ isLoading: true })

    api.getBio(state.username).then(res => {
      if (res.message === 'Not Found') {
        setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        navigation.navigate('Dashboard', { userInfo: res })
        setState(initialState)
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Search for a Github user</Text>

      <TextInput
        style={styles.searchInput}
        value={state.username}
        onChange={handleInputChange}
      />

      <TouchableHighlight
        style={styles.button}
        onPress={handleSubmit}
        underlayColor="white"
      >
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableHighlight>

      {showError}

      <ActivityIndicator
        animating={state.isLoading}
        color="#111"
        size="large"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
