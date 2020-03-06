import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";


export default function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [guideText, setGuideText] = useState('Guess a number between 1-100')
  const [guessCount, setGuessCount] = useState(0)
  const [highscore, setHighscore] = useState('')

  storeHighscore = async () => {
    try {
      await AsyncStorage.setItem('highscore', guessCount)
    } catch (error) {
      Alert.alert('error saving highscore')
    }
  }

  getHighscore = async () => {
    try {
      await AsyncStorage.getItem('highscore')
        .then(response => setHighscore(response))
    } catch (error) {
      Alert.alert('error reading highscore')
    }
  }

  const handlePress = () => {
    if (guess < number) {
      setGuideText(`Your guess ${guess} is too low`)
      setGuessCount(guessCount + 1)
    } else if (guess > number) {
      setGuideText(`Your guess ${guess} is too high`)
      setGuessCount(guessCount + 1)
    } else {
      Alert.alert(`Your guessed the number in ${guessCount} guesses`)

      if (guessCount < highscore) {
        storeGuessCount()
        getHighscore()
      }
    }
  }

    return (
      <View style={styles.container}>
        <Text>{guideText}</Text>
        <TextInput 
          style={styles.numberInput}
          onChangeText={guess => setGuess(guess)}
        />
        <Button 
          title="Make Guess" 
          onPress={handlePress}
        />
        <Text>Highscore: {highscore}</Text>
      </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  numberInput: {
    margin: 10,
    width: 50,
    borderColor: 'grey',
    borderWidth: 1
  }
})
