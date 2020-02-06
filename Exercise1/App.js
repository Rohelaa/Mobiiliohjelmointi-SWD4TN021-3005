import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState(0)

  const calculateSum = () => {
    setResult(Number(value1) + Number(value2))
  }

  const calculateSubtraction = () => {
    setResult(Number(value1) - Number(value2))
  }
  
  
    return (
      <View style={styles.container}>
        <Text>Result: {result}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setValue1(value)}
          value={value1}
          keyboardType='decimal-pad'
        />
        <TextInput 
          style={styles.textInput} 
          onChangeText={value => setValue2(value)}
          value={value2}
          keyboardType='decimal-pad'
        />
        <View style={styles.buttons}>
          <Button 
            style={styles.calculationButton} 
            title="+" 
            onPress={calculateSum} 
          />  
          <Button style={styles.calculationButton} title="-" onPress={calculateSubtraction} />      
        </View>
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
  textInput: {
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    
  }
})
