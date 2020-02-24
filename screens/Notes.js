import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { api } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  )
}

export default function Notes({ route }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function getNotes() {
      let userNotes = await api.getNotes(userInfo.login)
      setNotes(userNotes)
    }
    getNotes()
  }, [userInfo])

  const initialState = {
    notes,
    note: '',
    error: ''
  }

  const [state, setState] = useSetState(initialState)
  const { userInfo } = route.params;

  const handleChange = ({ nativeEvent }) => useSetState({ notes: nativeEvent.text })

  const handleSubmit = () => {
    const { login } = userInfo;

    setState({ note: '' })

    api
      .addNote(login, note)
      .then(() => {
        api.getNotes(login).then(res => setState({ notes: res }));
      })
      .catch(error => {
        console.warning('Error on note submit: ', error);
        setState({ error })
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={state.note}
          onChange={handleChange}
          placeholder="New note"
        />

        <TouchableHighlight
          style={styles.button}
          onPress={handleSubmit}
          underlayColor="#88D4A5"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}