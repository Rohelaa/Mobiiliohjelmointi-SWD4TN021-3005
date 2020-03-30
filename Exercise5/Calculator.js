import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Calculator({ navigation }) {
  const [calculation, setCalculation] = useState({
      value1: '',
      value2: '',
      calcResult: '',
      calcType: '',
      id: ''
    })
  const [calculations, setCalculations] = useState([])

  const generateId = () => (

    // heittää varoitusta konsolissa, joten muutettava Number-oliosta Stringiksi 
    String(calculations.length + 1)
  )

  const calculateSum = () => {
    const result = Number(calculation.value1) + Number(calculation.value2)
    setCalculations([...calculations,
      {
        ...calculation, 
        calcResult: result, 
        calcType: '+', 
        id: generateId()
      }
    ])
    // asettaa laskun tuloksen muuttujaan 'calcResult'
    setCalculation({ ...calculation, calcResult: result })
  }

  const calculateSubtraction = () => {
    const result = Number(calculation.value1) - Number(calculation.value2)
    console.log(result)
    setCalculations([...calculations, 
      {
        ...calculation,
        calcResult: result,
        calcType: '-',
        id: generateId()
      }
    ])
    setCalculation({ ...calculation, calcResult: result })
  }

    return (
      <View style={styles.container}>
        <Text>Result: {calculation.calcResult}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setCalculation({...calculation, value1: value})}
          value={calculation.value1}
          keyboardType='decimal-pad'
        />
        <TextInput 
          style={styles.textInput} 
          onChangeText={value => setCalculation({...calculation, value2: value})}
          value={calculation.value2}
          keyboardType='decimal-pad'
        />
        <View style={styles.buttons}>
          {/* Button komponentin korvike
              Tässä tapauksessa hyvä, koska mahdollistaa tyylin lisäämisen
           */}
          <TouchableOpacity
            style={styles.button}
            onPress={calculateSum}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={calculateSubtraction}
            style={styles.button}
          >
            <Text>-</Text>
          </TouchableOpacity>  
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('History', { calculations: calculations })
            }}
            style={styles.button}
          >
            <Text>History</Text>
          </TouchableOpacity>  
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
    marginTop: 10
  },
  button: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#61abe9',
    borderRadius: 5
  }
})